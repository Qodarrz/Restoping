import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getInitialCartItems = () => {
    if (location.state?.cartItems) {
      return location.state.cartItems;
    }
    
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return [];
      }
    }
    
    return [];
  };

  const [orderItems, setOrderItems] = useState(getInitialCartItems);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(orderItems));
  }, [orderItems]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setOrderItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateDeliveryFee = () => {
    return deliveryOption === "delivery" ? 15000 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
  };

  const handlePlaceOrder = () => {
    // Validation
    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (deliveryOption === "delivery" && !address.trim()) {
      alert("Please enter your delivery address!");
      return;
    }

    if (deliveryOption === "dine-in" && !tableNumber.trim()) {
      alert("Please enter your table number!");
      return;
    }

    const orderData = {
      items: orderItems,
      paymentMethod,
      deliveryOption,
      address: deliveryOption === "delivery" ? address : "",
      tableNumber: deliveryOption === "dine-in" ? tableNumber : "",
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      deliveryFee: calculateDeliveryFee(),
      total: calculateTotal(),
      status: "pending",
      timestamp: new Date().toISOString()
    };
    
    console.log("Order placed:", orderData);
    
    localStorage.removeItem("cart");
    
    alert("Order placed successfully!");
    navigate("/customer/order-confirmation", { state: { orderData } });
  };

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
            <div className="p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-1 text-gray-500">Add some items from our menu to get started</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/customer/menus")}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Browse Menu
                </button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {orderItems.map((item) => (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {item.image ? (
                        <img
                          className="w-20 h-20 rounded-md object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-md bg-gray-200 flex items-center justify-center">
                          <svg
                            className="h-8 w-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="ml-4 text-lg font-semibold text-gray-900">
                          Rp{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Rp{item.price.toLocaleString()} each
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <svg
                              className="h-4 w-4 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="px-3 py-1 border-t border-b border-gray-300 bg-white text-center min-w-[3rem]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                            disabled={item.quantity >= 100}
                          >
                            <svg
                              className="h-4 w-4 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                      {item.notes && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Notes:</span> {item.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Delivery Options</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="delivery"
                    name="deliveryOption"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    checked={deliveryOption === "delivery"}
                    onChange={() => setDeliveryOption("delivery")}
                  />
                  <label
                    htmlFor="delivery"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Delivery (+Rp15,000)
                  </label>
                </div>
                {deliveryOption === "delivery" && (
                  <div className="ml-7">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      rows={3}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter your full address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <input
                    id="dine-in"
                    name="deliveryOption"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    checked={deliveryOption === "dine-in"}
                    onChange={() => setDeliveryOption("dine-in")}
                  />
                  <label
                    htmlFor="dine-in"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Dine In
                  </label>
                </div>
                {deliveryOption === "dine-in" && (
                  <div className="ml-7">
                    <label
                      htmlFor="tableNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Table Number *
                    </label>
                    <input
                      type="text"
                      id="tableNumber"
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter table number"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <input
                    id="takeaway"
                    name="deliveryOption"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    checked={deliveryOption === "takeaway"}
                    onChange={() => setDeliveryOption("takeaway")}
                  />
                  <label
                    htmlFor="takeaway"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Take Away
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="cash"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <label
                    htmlFor="cash"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Cash on Delivery
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="bank-transfer"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    checked={paymentMethod === "bank-transfer"}
                    onChange={() => setPaymentMethod("bank-transfer")}
                  />
                  <label
                    htmlFor="bank-transfer"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Bank Transfer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="e-wallet"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    checked={paymentMethod === "e-wallet"}
                    onChange={() => setPaymentMethod("e-wallet")}
                  />
                  <label
                    htmlFor="e-wallet"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    E-Wallet (Gopay, OVO, etc)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    checked={paymentMethod === "credit-card"}
                    onChange={() => setPaymentMethod("credit-card")}
                  />
                  <label
                    htmlFor="credit-card"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Credit/Debit Card
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {orderItems.length > 0 && (
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rp{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium">Rp{calculateTax().toLocaleString()}</span>
                </div>
                {deliveryOption === "delivery" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">Rp{calculateDeliveryFee().toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    Rp{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;