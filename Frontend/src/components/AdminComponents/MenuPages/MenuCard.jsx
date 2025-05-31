import PropTypes from 'prop-types';
import { formatPrice } from "../../../helper/pricehelper";

const MenuCard = ({ menu, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="h-48 w-full overflow-hidden">
        {menu.image ? (
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      
      {/* Konten teks dengan flex-grow untuk mengisi sisa space */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
          {menu.name}
        </h2>
        <p className="text-gray-600 line-clamp-2 mb-3 flex-grow">
          {menu.description || 'No description available'}
        </p>
        <p className="font-semibold text-green-600 mt-auto">
          Rp. {formatPrice(menu.price)}
        </p>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuCard;