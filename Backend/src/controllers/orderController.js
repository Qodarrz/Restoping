const Order = require("../models/orderModel");
const OrderDetail = require("../models/orderdetailModel");
const MenuItem = require("../models/menuModel");
const MidtransService = require("../middleware/paymentservice");
const PaymentTransaction = require("../models/paymentTransactionModel");

exports.createOrder = async (req, res) => {
  console.log("==== createOrder called ====");
  console.log("Request user:", req.user);
  console.log("Request body:", req.body);

  const { items, totalAmount } = req.body;
  const name = req.user.name;
  const user_id = req.user.id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    console.log("Error: Items kosong atau bukan array");
    return res.status(400).json({ message: "Items tidak boleh kosong." });
  }

  try {
    // Cek order terakhir user
    const lastOrder = await Order.findOne({
      where: { user_id },
      order: [["created_at", "DESC"]],
    });
    console.log("Last order for user:", lastOrder);

    if (lastOrder) {
      const now = new Date();
      const lastOrderTime = new Date(lastOrder.createdAt);
      const diffInMinutes = (now - lastOrderTime) / (1000 * 60);
      console.log(`Time since last order: ${diffInMinutes} minutes`);
      if (diffInMinutes < 1) {
        console.log("Error: Order dibuat terlalu cepat");
        return res.status(429).json({
          message: "Anda hanya bisa membuat pesanan baru setiap 1 menit",
          nextOrderTime: new Date(lastOrderTime.getTime() + 60000),
        });
      }
    }

    // Validasi detail items
    for (const item of items) {
      console.log("Item sebelum validasi:", item);
      const quantity = Number(item.quantity);
      const price = Number(item.price);
      const total = Number(item.total);

      if (!item.menu_id || isNaN(quantity) || isNaN(price) || isNaN(total)) {
        console.log("Validasi gagal pada item:", {
          menu_id: item.menu_id,
          quantity,
          price,
          total,
        });
        return res.status(400).json({
          message: `Data item tidak lengkap atau salah format.`,
        });
      }
    }

    console.log("Membuat order baru dengan totalAmount:", totalAmount);
    const order = await Order.create({
      user_id,
      total_amount: totalAmount,
      status: "pending",
    });
    console.log("Order berhasil dibuat:", order);

    const orderDetailsPromises = items.map((item) => {
      console.log("Membuat OrderDetail untuk item:", item);
      return OrderDetail.create({
        order_id: order.id,
        menu_id: item.menu_id,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      });
    });
    await Promise.all(orderDetailsPromises);
    console.log("Semua OrderDetail berhasil dibuat");

    // Buat payment QR code
    let paymentQrCodeData = null;
    try {
      console.log("Membuat QR code pembayaran via Midtrans");
      paymentQrCodeData = await MidtransService.createQrisPayment({
        order_id: order.id,
        amount: totalAmount,
        description: `Pembayaran Pesanan #${order.id}`,
        customer_name: "Pelanggan Meja " + name,
      });
      console.log("QR code pembayaran berhasil dibuat:", paymentQrCodeData);

      await PaymentTransaction.create({
        order_id: order.id,
        pg_transaction_id: paymentQrCodeData.transaction_id,
        qr_code_url: paymentQrCodeData.qr_code_url,
        status: "pending",
        amount: totalAmount,
      });
      console.log("PaymentTransaction berhasil dibuat");
    } catch (pgError) {
      console.error("Gagal membuat QR Code Pembayaran:", pgError);
      return res.status(500).json({
        message:
          "Pesanan berhasil dibuat, tetapi gagal mendapatkan QR Code pembayaran.",
        order: order,
      });
    }

    console.log("Selesai createOrder, kirim response ke client");
    res.status(201).json({
      message:
        "Pesanan berhasil dibuat dan QR code pembayaran telah dihasilkan",
      order: order,
      payment_qr_code: paymentQrCodeData ? paymentQrCodeData.qr_code_url : null,
      payment_transaction_id: paymentQrCodeData
        ? paymentQrCodeData.transaction_id
        : null,
    });
  } catch (error) {
    console.error("Error saat membuat pesanan:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat pesanan",
      error: error.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderDetail,
          include: [MenuItem],
        },
      ],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil pesanan" });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: OrderDetail,
          include: [MenuItem],
        },
      ],
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil pesanan" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Status pesanan berhasil diperbarui",
      order,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui status pesanan" });
  }
};
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const order = await Order.findOne({
      where: { id, user_id },
      include: [OrderDetail],
    });

    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }

    const now = new Date();
    const orderTime = new Date(order.createdAt);
    const diffInMinutes = (now - orderTime) / (1000 * 60);

    if (diffInMinutes > 1) {
      return res.status(403).json({
        message:
          "Pesanan hanya bisa dibatalkan dalam waktu 1 menit setelah dibuat",
        timeLeft: 1 - diffInMinutes,
      });
    }

    if (order.OrderDetails && order.OrderDetails.length > 0) {
      await OrderDetail.destroy({
        where: { order_id: id },
      });
    }

    await order.destroy();

    res.status(200).json({ message: "Pesanan berhasil dibatalkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus pesanan",
      error: error.message,
    });
  }
};
