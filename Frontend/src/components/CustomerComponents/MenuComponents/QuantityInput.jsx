import PropTypes from 'prop-types';

const QuantityInput = ({ value, onChange, min = 1, max = 100 }) => {
  const handleChange = (newValue) => {
    const numValue = parseInt(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => handleChange(value - 1)}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
        disabled={value <= min}
      >
        -
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none"
      />
      <button
        onClick={() => handleChange(value + 1)}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
};

QuantityInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default QuantityInput;