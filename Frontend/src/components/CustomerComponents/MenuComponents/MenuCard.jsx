import { FaCartPlus } from "react-icons/fa";
import ImageWithFallback from "./ImageWithFallback";
import QuantityInput from "./QuantityInput";
import PropTypes from "prop-types";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const MenuCard = ({
  menu,
  quantities,
  onNavigate,
  onAddToCart,
  onQuantityChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition cursor-pointer border border-gray-100 flex flex-col h-full">
      <div onClick={onNavigate} className="flex flex-col flex-grow">
        <div className="relative w-full aspect-square overflow-hidden">
          <ImageWithFallback
            src={menu.image}
            alt={menu.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="p-3 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h2 className="text-sm font-bold text-gray-900 truncate">
              {menu.name}
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap flex-shrink-0">
              {menu.category === "food" ? "Food" : "Drink"}
            </span>
          </div>
          
          <p className="text-xs text-gray-600 mb-2 line-clamp-2 h-10 overflow-hidden">
            {menu.description || "No description available."}
          </p>
          
          <p className="text-sm font-semibold text-green-700 mt-auto">
            {formatRupiah(menu.price)}
          </p>
        </div>
      </div>

      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <QuantityInput
            value={quantities[menu.id] || 1}
            onChange={(value) => onQuantityChange(menu.id, value)}
            min={1}
            max={100}
          />
          <button
            onClick={onAddToCart}
            className="flex-1 text-xs bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-1"
          >
            <FaCartPlus className="h-3 w-3" />
            <span>Add Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  quantities: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default MenuCard;