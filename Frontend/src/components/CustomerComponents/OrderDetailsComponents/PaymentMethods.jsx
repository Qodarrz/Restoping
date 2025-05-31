import PropTypes from "prop-types";

const PaymentMethods = ({ paymentMethod, setPaymentMethod }) => {
  return (
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
  );
};

PaymentMethods.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  setPaymentMethod: PropTypes.func.isRequired,
};

export default PaymentMethods;