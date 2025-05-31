const axios = require("axios");
const btoa = require("btoa"); // base64 encoder

const MIDTRANS_SERVER_KEY = process.env.SERVER_KEY;
const MIDTRANS_API_URL = "https://api.sandbox.midtrans.com/v2/charge";

class MidtransService {
  static async createQrisPayment(paymentDetails) {
    try {
      const authHeader = "Basic " + btoa(MIDTRANS_SERVER_KEY + ":");

      console.log("MIDTRANS_SERVER_KEY:", MIDTRANS_SERVER_KEY);

      const response = await axios.post(
        MIDTRANS_API_URL,
        {
          payment_type: "qris",
          transaction_details: {
            order_id: paymentDetails.order_id,
            gross_amount: paymentDetails.amount,
          },
          qris: {
            acquirer: "gopay", // bisa disesuaikan atau dihapus
          },
          customer_details: {
            first_name: paymentDetails.customer_name,
            email: paymentDetails.customer_email || "noemail@example.com",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      const actions = response.data.actions || [];
      const qrCodeAction = actions.find((a) => a.name === "generate-qr-code");

      return {
        qr_code_url: qrCodeAction?.url || null,
        transaction_id: response.data.transaction_id,
        status: response.data.transaction_status,
      };
    } catch (error) {
      console.error(
        "Midtrans QRIS error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.status_message ||
          "Gagal membuat transaksi QRIS Midtrans"
      );
    }
  }
}

module.exports = MidtransService;
