const RadioButton = (props) => {
  const {
    value,
    className,
    children,
    size,
    onChange,
    label,
    checked,
    type,
    ...rest
  } = props;

  return (
    <>
      <div>
        <input
          type={type}
          id={value}
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

export default RadioButton;
