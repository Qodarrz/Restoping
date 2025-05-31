import PropTypes from "prop-types";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <li className="p-4 sm:p-6">
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
            <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
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
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
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
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
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
              onClick={() => onRemove(item.id)}
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
  );
};
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;