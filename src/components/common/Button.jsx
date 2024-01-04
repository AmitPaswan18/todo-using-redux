import PropTypes from "prop-types";

function Button(props) {
  const { children, className, ...rest } = props;
  Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
  };

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};

export default Button;
