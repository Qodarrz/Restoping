import PropTypes from "prop-types";

const OrderSummary = ({
  subtotal,
  tax,
  deliveryFee,
  total,
  deliveryOption,
  onPlaceOrder,
  isLoading,
}) => {
  return (
    <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">Rp{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium">Rp{tax.toLocaleString()}</span>
          </div>
          {deliveryOption === "delivery" && (
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">Rp{deliveryFee.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-bold text-green-600">
              Rp{total.toLocaleString()}
            </span>
          </div>
        </div>
        <button
          onClick={onPlaceOrder}
          disabled={isLoading}
          className={`mt-6 w-full text-white font-medium py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
            isLoading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number,
  total: PropTypes.number.isRequired,
  deliveryOption: PropTypes.string.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default OrderSummary;