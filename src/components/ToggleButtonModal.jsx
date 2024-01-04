import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";
import PropTypes from "prop-types";

const ToggleButton = ({
  deleteTodoItems,
  editInputRef,
  editIndex,
  index,
  handleEditSubmit,
  editTodo,
}) => {
  return (
    <div className="flex w-[75px] flex-col md:flex-row ml-4 md:mt-1">
      <RiDeleteBin5Fill
        className="m-1"
        color="red"
        opacity={0.6}
        size={25}
        style={{ cursor: "pointer" }}
        onClick={() => deleteTodoItems(index)}
      />

      <RiEditBoxLine
        className="m-1"
        ref={editInputRef}
        opacity={0.6}
        size={25}
        style={{ cursor: "pointer" }}
        onClick={() =>
          editIndex === index ? handleEditSubmit() : editTodo(index)
        }
      />
    </div>
  );
};

ToggleButton.propTypes = {
  editInputRef: PropTypes.string,
  editIndex: PropTypes.string,
  index: PropTypes.any,
  handleEditSubmit: PropTypes.func,
  editTodo: PropTypes.func,
  deleteTodoItems: PropTypes.func,
};

export default ToggleButton;
