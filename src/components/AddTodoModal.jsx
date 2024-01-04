import Button from "./common/Button.jsx";
import PropTypes from "prop-types";

const AddTodo = ({
  handleActiveSubmit,
  handleSubmit,
  setTitle,
  isactive,
  title,
}) => {
  return (
    <div>
      {isactive == true ? (
        <div className=" absolute top-[150px] lg:left-[33%] left-4 md:left-[30%]  border-2 bg-white rounded-md flex flex-col w-[340.62px] h-[297.24px] justify-center ">
          <form
            className="h-[200px] w-full ml-4"
            name="todoform"
            onSubmit={handleSubmit}>
            {" "}
            <div className=" w-[87px] h-[41px] font-bold left-[30px] top-[109px] text-[18px] leading-[41px] tracking-[1%]">
              Add Todo
            </div>
            <textarea
              name="todoform"
              id=""
              cols="30"
              type="text"
              className="rounded-[10px] border-2 h-[148px] w-[298px] border-1 placeholder:text-start p-2"
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              value={title}
              rows="10"></textarea>
          </form>
          <div className=" flex justify-between ml-4 w-[298px] h-[44px] text-sky-600">
            <Button
              type="text"
              onClick={handleActiveSubmit}
              className="bg-slate-50 text-skyblue border-2 rounded-md p-2">
              {" "}
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-slate-100 font-medium text-skyblue border-2 rounded-md p-2">
              {" "}
              Done
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

console.log();

AddTodo.propTypes = {
  handleActiveSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  setTitle: PropTypes.func,
  isactive: PropTypes.bool,
  title: PropTypes.string,
};

export default AddTodo;
