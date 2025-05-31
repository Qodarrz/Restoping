import PropTypes from "prop-types";

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="text-center py-10">
      <div className="text-red-600 mb-4">{error}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-[#2E8B57] text-white px-4 py-2 rounded-lg hover:bg-[#539770] transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

ErrorDisplay.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onRetry: PropTypes.func,
};

export default ErrorDisplay;