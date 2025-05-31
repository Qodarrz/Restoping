import { useRef, useState } from "react";
import PropTypes from "prop-types";

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const tabsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };

  const categories = [
    { id: "all", label: "All Items" },
    { id: "food", label: "Food" },
    { id: "drink", label: "Drinks" },
  ];

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-2 font-medium text-sm ${
                activeCategory === category.id
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden relative mb-8">
        <div
          ref={tabsRef}
          className="flex overflow-x-auto scrollbar-hide space-x-2 py-2 px-1"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={(e) => {
            setIsDragging(true);
            setStartX(e.touches[0].pageX - tabsRef.current.offsetLeft);
            setScrollLeft(tabsRef.current.scrollLeft);
          }}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={(e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - tabsRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            tabsRef.current.scrollLeft = scrollLeft - walk;
          }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 px-6 py-2 rounded-lg font-medium text-sm ${
                activeCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#F9FAFB] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#F9FAFB] to-transparent pointer-events-none"></div>
      </div>
    </>
  );
};
CategoryTabs.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryTabs;