import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
      <p className="mt-1 text-gray-500">
        Add some items from our menu to get started
      </p>
      <div className="mt-6">
        <button
          onClick={() => navigate("/customer/menus")}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Browse Menu
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;