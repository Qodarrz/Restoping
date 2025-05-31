import PropTypes from "prop-types";
import clsx from "clsx";

const MenuImage = ({ image, name, className, size, onAddToCart }) => {
  const sizeClasses = {
    sm: "aspect-[4/3]",
    md: "aspect-[4/3]",
    lg: "aspect-[4/3]",
  };

  return (
    <div className={clsx("flex flex-col items-center gap-2", className)}>
      <div className="w-full overflow-hidden rounded-t-xl">
        {image ? (
          <img
            src={image}
            alt={name ? `${name} visual` : "Menu item visual representation"}
            className={clsx("w-full object-cover", sizeClasses[size])}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={clsx(
              "w-full aspect-[4/3] bg-gray-200 flex items-center justify-center text-sm text-gray-600 font-medium"
            )}
            aria-label="Image not available"
          >
            No image available
          </div>
        )}
      </div>

      {onAddToCart && (
        <button
          onClick={onAddToCart}
          className="mt-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-all shadow"
        >
          Tambahkan ke Keranjang
        </button>
      )}
    </div>
  );
};

MenuImage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onAddToCart: PropTypes.func,
};

MenuImage.defaultProps = {
  size: "lg",
};

export default MenuImage;
