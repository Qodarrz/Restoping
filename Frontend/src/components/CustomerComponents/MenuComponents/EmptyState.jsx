import PropTypes from 'prop-types';

const EmptyState = ({ message, actionText, onAction, showAction = true }) => {
  return (
    <div className="col-span-full text-center py-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="mt-4 text-gray-500 text-lg">{message}</p>
      {showAction && (
        <button
          onClick={onAction}
          className="mt-4 bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  showAction: PropTypes.bool,
};

export default EmptyState;