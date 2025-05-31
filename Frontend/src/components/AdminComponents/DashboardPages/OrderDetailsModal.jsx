import PropTypes from "prop-types";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const OrderDetailsModal = ({ order, onClose, onProcessOrder }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "EEEE, dd MMMM yyyy HH:mm", {
      locale: id,
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-blur bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Order #{order.id}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(order.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Order Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer ID</p>
                    <p className="mt-1 font-medium">{order.user_id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-gray-700 mb-4">Order Items</h4>
              <div className="space-y-4">
                {order.OrderDetails?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                      {item.Menu?.image && (
                        <img
                          src={item.Menu.image}
                          alt={item.Menu.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h5 className="font-medium text-gray-800">
                        {item.Menu?.name || `Item ${item.id}`}
                      </h5>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.Menu?.description}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500">
                          {item.quantity} × Rp{" "}
                          {Number(item.price).toLocaleString("id-ID")}
                        </span>
                        <span className="font-medium text-gray-800">
                          Rp {Number(item.total).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              {(() => {
                const total = Number(order.total_amount);
                const taxRate = 0.1;
                const subtotal = total / (1 + taxRate);
                const tax = total - subtotal;

                return (
                  <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal:</span>
                      <span>
                        Rp {Math.round(subtotal).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (10%):</span>
                      <span>Rp {Math.round(tax).toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-300">
                      <span>Total:</span>
                      <span>Rp {total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          {order.status === "pending" && (
            <button
              onClick={() => onProcessOrder(order.id)}
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Process Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

OrderDetailsModal.propTypes = {
  order: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onProcessOrder: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
};

export default OrderDetailsModal;