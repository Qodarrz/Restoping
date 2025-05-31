import PropTypes from 'prop-types';
import { formatPrice } from "../../../helper/pricehelper";

const MenuModal = ({ menu, onClose, onEdit, onDelete }) => {
  if (!menu) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-blur backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-100 transform transition-all duration-300 scale-[0.98] hover:scale-100">
        {/* Header with soft gradient */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{menu.name}</h2>
              <p className="text-teal-100 mt-1 text-sm font-medium capitalize">
                {menu.category || "No category specified"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-teal-100 text-2xl transition-transform hover:scale-110"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row overflow-auto">
          {/* Image Section with subtle frame */}
          <div className="md:w-2/5 h-64 md:h-auto overflow-hidden bg-gray-50 flex items-center justify-center p-2 border-b md:border-b-0 md:border-r border-gray-100">
            {menu.image ? (
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-full object-cover rounded-lg shadow-inner"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <span className="text-gray-300 text-lg">No image available</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-6 overflow-y-auto">
            {/* Description with fade effect */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-100">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {menu.description || "No description provided"}
              </p>
            </div>

            {/* Details with card style */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Price
                </h3>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatPrice(parseFloat(menu.price))}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Category
                </h3>
                <p className="text-lg font-bold text-gray-700 capitalize">
                  {menu.category || "N/A"}
                </p>
              </div>
            </div>

            {/* Action Buttons with smooth hover */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => onEdit(menu.id)}
                className="flex-1 min-w-[120px] bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete(menu.id)}
                className="flex-1 min-w-[120px] bg-rose-500 hover:bg-rose-600 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete
              </button>
              <button
                onClick={onClose}
                className="flex-1 min-w-[120px] bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuModal.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string,
    image: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MenuModal;