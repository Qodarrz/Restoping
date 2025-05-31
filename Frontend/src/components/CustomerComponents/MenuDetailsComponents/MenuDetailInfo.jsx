import PropTypes from "prop-types";

const MenuDetailInfo = ({ label, value }) => {
  return (
    <p className="text-gray-700">
      <span className="font-semibold">{label}:</span> {value || "Not available"}
    </p>
  );
};

MenuDetailInfo.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MenuDetailInfo;