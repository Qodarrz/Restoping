import { FaTimes } from "react-icons/fa";
import QuantityInput from "./QuantityInput";
import PropTypes from "prop-types";

const ShoppingCart = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onCheckout,
  onClose,
}) => {
  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="fixed bottom-24 right-8 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-lg">Your Cart</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Rp {item.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(newQuantity) =>
                        onUpdateItem(item.id, newQuantity)
                      }
                      min={1}
                      max={100}
                    />
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>Rp {calculateTotal().toLocaleString()}</span>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={onCheckout}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

ShoppingCart.propTypes = {
  items: PropTypes.array.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShoppingCart;