import PropTypes from "prop-types";

const RadioButton = (props) => {
  const { value, className, onChange, label, checked, type } = props;

  return (
    <>
      <div>
        <input
          type={type}
          value={value}
          className={className}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={value}>{label}</label>
      </div>
    </>
  );
};
RadioButton.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
export default RadioButton;
