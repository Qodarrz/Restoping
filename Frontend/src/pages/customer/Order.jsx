import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SweetAlertInstance } from "../../components/SweetAlert";
import Loading from "../../components/Loading";
import CartItem from "../../components/CustomerComponents/OrderComponents/CartItem";
import DeliveryOptions from "../../components/CustomerComponents/OrderComponents/DeliveryOptions";
import EmptyCart from "../../components/CustomerComponents/OrderComponents/EmptyCart";
import OrderSummary from "../../components/CustomerComponents/OrderComponents/OrderSummary";
import PaymentMethods from "../../components/CustomerComponents/OrderComponents/PaymentMethods";

const API_URL = import.meta.env.VITE_API_URL;

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const processCartItem = (item) => ({
    ...item,
    price: typeof item.price === "string" ? parseFloat(item.price) : item.price,
    quantity:
      typeof item.quantity === "string"
        ? parseInt(item.quantity, 10)
        : item.quantity,
  });

  const getInitialCartItems = () => {
    if (location.state?.cartItems) {
      return location.state.cartItems.map(processCartItem);
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        return Array.isArray(parsedCart) ? parsedCart.map(processCartItem) : [];
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return [];
      }
    }

    return [];
  };

  const [orderItems, setOrderItems] = useState(() => {
    const initial = getInitialCartItems();
    return Array.isArray(initial) ? initial : [];
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(orderItems));
  }, [orderItems]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1;
  };

  const calculateDeliveryFee = () => {
    return deliveryOption === "delivery" ? 15000 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
  };

  const handlePlaceOrder = async () => {
    if (isLoading) return;

    if (orderItems.length === 0) {
      SweetAlertInstance.fire({
        title: "Your Cart Is Empty",
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      return;
    }

    if (deliveryOption === "delivery" && !address.trim()) {
      SweetAlertInstance.fire({
        title: "Please Fill Address",
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      return;
    }

    if (deliveryOption === "dine-in" && !tableNumber.trim()) {
      SweetAlertInstance.fire({
        title: "Please Fill Number Table",
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      return;
    }

    try {
      setIsLoading(true);

      const itemsFormatted = orderItems.map((item) => ({
        menu_id: item.id,
        name: item.name,
        image: item.image,
        price: Number(item.price).toFixed(2),
        quantity: item.quantity,
        total: item.price * item.quantity,
        notes: item.notes,
        variant: item.variant,
      }));

      const subtotal = calculateSubtotal();
      const tax = calculateTax();
      const deliveryFee = calculateDeliveryFee();
      const totalAmount = subtotal + tax + deliveryFee;

      const orderData = {
        items: itemsFormatted,
        paymentMethod,
        deliveryOption,
        address: deliveryOption === "delivery" ? address : null,
        tableNumber: deliveryOption === "dine-in" ? tableNumber : null,
        deliveryFee,
        subtotal,
        tax,
        totalAmount,
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to place order");
      }

      localStorage.removeItem("cart");

      navigate("/customer/orderconfirmation", {
        state: {
          orderData: {
            ...orderData,
            id: result.order.id,
            status: result.order.status,
            createdAt: result.order.createdAt,
          },
          paymentData: {
            qrCodeUrl: result.payment_qr_code,
            transactionId: result.payment_transaction_id,
          },
        },
      });
    } catch (error) {
      console.error("Order error:", error);
      alert("Terjadi kesalahan saat membuat pesanan");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    <div className="min-h-screen bg-[#F9FAFB] py-10 px-4 sm:px-6 flex items-center justify-center">
      <Loading />
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Order</h1>
          <p className="mt-2 text-gray-600">Review and complete your order</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
          </div>

          {orderItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <ul className="divide-y divide-gray-200">
              {orderItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={removeItem}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DeliveryOptions
            deliveryOption={deliveryOption}
            setDeliveryOption={setDeliveryOption}
            address={address}
            setAddress={setAddress}
            tableNumber={tableNumber}
            setTableNumber={setTableNumber}
          />

          <PaymentMethods
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        {orderItems.length > 0 && (
          <OrderSummary
            subtotal={calculateSubtotal()}
            tax={calculateTax()}
            deliveryFee={calculateDeliveryFee()}
            total={calculateTotal()}
            deliveryOption={deliveryOption}
            onPlaceOrder={handlePlaceOrder}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Order;
