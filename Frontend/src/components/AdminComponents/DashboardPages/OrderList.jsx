import PropTypes from 'prop-types';

const OrdersList = ({ pendingOrders, allOrdersCount, onOrderClick, onRefresh }) => {
  return (
    <div>
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800">
          Recent Pending Orders ({pendingOrders.length})
        </h3>
      </div>
      
      {pendingOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {allOrdersCount > 0
              ? "No pending orders found"
              : "No orders available"}
          </p>
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Refresh Orders
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {pendingOrders.map((order) => (
            <li
              key={order.id}
              className="py-4 px-6 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onOrderClick(order)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span>Customer ID: {order.user_id}</span>
                    <span className="mx-2">•</span>
                    <span>Total: Rp {Number(order.total_amount).toLocaleString("id-ID")}</span>
                  </p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  {order.status.toUpperCase()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

OrdersList.propTypes = {
  pendingOrders: PropTypes.array.isRequired,
  allOrdersCount: PropTypes.number.isRequired,
  onOrderClick: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default OrdersList;