import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, paymentData } = location.state || {};

  useEffect(() => {
    if (!orderData || !paymentData) {
      navigate("/customer/menus");
    }
  }, [orderData, paymentData, navigate]);

  if (!orderData || !paymentData) {
    return null;
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-gray-600">
            Thank you for your order. Your payment is being processed.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Order Number
                </h3>
                <p className="mt-1 text-sm text-gray-900">{orderData.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(orderData.createdAt)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {orderData.status}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Payment Method
                </h3>
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {orderData.paymentMethod.replace("-", " ")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Delivery Option
                </h3>
                <p className="mt-1 text-sm text-gray-900 capitalize">
                  {orderData.deliveryOption.replace("-", " ")}
                </p>
              </div>
              {orderData.deliveryOption === "delivery" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {orderData.address}
                  </p>
                </div>
              )}
              {orderData.deliveryOption === "dine-in" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Table Number
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {orderData.tableNumber}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {orderData.items.map((item) => (
                  <li key={item.menu_id} className="py-4">
                    <div className="flex space-x-4">
                      {/* Food Image */}
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-md object-cover"
                          src={item.image || "/food-placeholder.jpg"}
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/food-placeholder.jpg";
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.name || "Menu Item"}
                            </p>
                            {item.variant && (
                              <p className="text-xs text-gray-500 mt-1">
                                Variant: {item.variant}
                              </p>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            Rp{item.total.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="mt-1">
                          <p className="text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          {item.notes && (
                            <p className="text-xs text-gray-500 mt-1">
                              Note: {item.notes}
                            </p>
                          )}
                        </div>
                        
                        {/* Additional food details if available */}
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Payment Information
              </h2>
            </div>
            <div className="p-6">
              {paymentData.qrCodeUrl && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-3">
                    Scan this QR code to complete your payment:
                  </p>
                  <div className="flex justify-center">
                    <img
                      src={paymentData.qrCodeUrl}
                      alt="Payment QR Code"
                      className="h-48 w-48 object-contain border border-gray-200 rounded-md"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Transaction ID: {paymentData.transactionId}
                  </p>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Rp{orderData.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium">
                    Rp{orderData.tax.toLocaleString()}
                  </span>
                </div>
                {orderData.deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      Rp{orderData.deliveryFee.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    Rp{orderData.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => navigate("/customer/menus")}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Back to Menu
          </button>
          <button
            onClick={() => navigate("/customer/order")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;