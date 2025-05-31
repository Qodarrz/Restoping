import PropTypes from 'prop-types';

const StatsCard = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
          <p className={`text-3xl font-bold mt-2 ${colorClass}`}>{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  colorClass: PropTypes.string.isRequired,
};

export default StatsCard;