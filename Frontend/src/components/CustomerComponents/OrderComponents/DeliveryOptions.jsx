import PropTypes from "prop-types";

const DeliveryOptions = ({
  deliveryOption,
  setDeliveryOption,
  address,
  setAddress,
  tableNumber,
  setTableNumber,
}) => {
  return (
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
  );
};
DeliveryOptions.propTypes = {
  deliveryOption: PropTypes.string.isRequired,
  setDeliveryOption: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  tableNumber: PropTypes.string.isRequired,
  setTableNumber: PropTypes.func.isRequired,
};

export default DeliveryOptions;