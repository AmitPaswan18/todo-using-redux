import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import { useDispatch, useSelector } from "react-redux";

import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from "../redux/actions/todoActions";

import ToggleSelectar from "./common/ToggleSelectar.jsx";

import Navbar from "./models/Navbar.jsx";
import Header from "./models/Header.jsx";
import AddTodo from "./models/AddTodo.jsx";
import ToggleButton from "./models/ToggleButton.jsx";

const TodoItems = () => {
  const [title, setTitle] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [filter, setFilter] = useState("all");

  const [isinputValid, setInputValid] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const [isactive, setActive] = useState(false);

  const dispatch = useDispatch();

  const todo = useSelector((state) => state.todo);

  const containerRef = useRef(null);
  const editInputRef = useRef(null);
  const inputRef = useRef(null);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleClick = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      handleEditSubmit(event);
    }
  };

  const filteredTodo = () => {
    switch (filter) {
      case "complete":
        return todo.filter((item, index) => checkedItems[index] === true);
      case "incomplete":
        return todo.filter((item, index) => checkedItems[index] !== true);
      case "all":
        return todo;
      default:
        return todo.todo;
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      return {
        ...prevCheckedItems,
        [id]: !prevCheckedItems[id],
      };
    });
  };

  const formValidation = (input) => {
    if (input.trim() === "") {
      setInputValid(false);
      return false;
    }

    setInputValid(true);
    return true;
  };

  const deleteTodoItems = (index) => {
    dispatch({
      type: DELETE_TODO,
      payload: { index: index },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidTitle = formValidation(title);
    if (!isValidTitle) {
      return;
    }
    if (editIndex !== null) {
      handleEditSubmit(event);
    } else {
      const id = nanoid();

      dispatch({
        type: ADD_TODO,
        payload: { id, title },
      });

      setTitle("");
      setActive(false);
    }
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setTitleEdit(todo[index].title);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setTitle("");
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const isValidTitle = formValidation(titleEdit);
    if (!isValidTitle) {
      return;
    }

    if (isValidTitle && editIndex !== null) {
      const editedTodo = todo[editIndex];
      console.log(editTodo);

      dispatch({
        type: UPDATE_TODO,
        payload: { id: editedTodo.id, title: titleEdit },
      });
      setEditIndex(null);
      setTitleEdit("");
    } else {
      setTitle("");
      setActive(false);
    }
  };

  const handleBlur = (event) => {
    if (editIndex !== null) {
      handleEditSubmit(event);
    }
  };

  const handleActive = () => {
    setActive(true);
  };
  const handleActiveSubmit = () => {
    setActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isinputValid === false &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setInputValid(true);
      }

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        editInputRef.current &&
        !editInputRef.current.contains(event.target)
      ) {
        if (editIndex !== null) {
          handleEditSubmit(event);
        }

        cancelEdit();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [containerRef, editIndex]);

  return (
    <>
      <Navbar />
      <div className="w-[375px] relative top-[44px] md:w-full md:h-full h-[860px]">
        <Header setActiveStatus={handleActive} />
        <div
          className="lg:w-full max-h-fit lg:h-screen "
          ref={containerRef}
          onClick={handleClick}>
          <div
            id="scrollbar"
            className="flex border-2 justify-center md:items-start  md:w-10/12 w-[375px] md:w-max-96 md:h-full flex-col md:flex-row items-center mx-auto  rounded-md lg:p-2">
            <div className=" max-h-96 md:max-h-98 overflow-y-auto  w-[375px] flex justify-center md:w-11/12  ">
              {todo.length === 0 ? (
                <div className=" flex flex-col justify-evenly items-center md:w-full md:z-100   lg:h-3/6 sm:h-1/2 ">
                  <div className="font-sans lg:font-extrabold  md:text-5xl text-sm font-bold my-2">
                    My Tasks
                  </div>

                  <div className=" text-md text-slate-500 opacity-40 py-2 ">
                    {" "}
                    You have No Task
                  </div>
                </div>
              ) : (
                <div className=" left-10 lg:w-11/12 w-full max-h-fit">
                  <div className=" md:w-full w-[375px]">
                    <div className="flex justify-center text-sm md:text-xl font-semibold mt-4  lg:gap-4 gap-2 ">
                      <label className="px-2 md:px-5 " htmlFor="All">
                        <ToggleSelectar
                          type="radio"
                          label="All"
                          value="all"
                          checked={filter === "all"}
                          onChange={() => handleFilterChange("all")}
                        />
                      </label>

                      <label className="px-2 md:px-5 " htmlFor="Complete">
                        <ToggleSelectar
                          type="radio"
                          className="px-2 md:px-10"
                          label="Complete"
                          value="complete"
                          checked={filter === "complete"}
                          onChange={() => handleFilterChange("complete")}
                        />
                      </label>
                      <label className="px-2 md:px-5 " htmlFor="Incomplete">
                        <ToggleSelectar
                          type="radio"
                          label="Incomplete"
                          value="incomplete"
                          checked={filter === "incomplete"}
                          onChange={() => handleFilterChange("incomplete")}
                        />{" "}
                      </label>
                    </div>
                    {isinputValid === false && (
                      <div className="text-red-600">
                        Please enter a valid task name
                      </div>
                    )}
                  </div>

                  <div className="mt-10 ">
                    {filteredTodo().map((item, index) => (
                      <div className=" max-h-fit" key={index}>
                        <div className="flex lg:mx-2 lg:gap-2 gap-0 flex-col">
                          <div
                            ref={editIndex === index ? editInputRef : null}
                            className="flex max-h-fit  my-2  w-full md:w-10/12 rounded-md justify-between md:py-1 md:px-1">
                            {editIndex === index ? (
                              <>
                                <div className="flex w-[300px] flex-col">
                                  <form onSubmit={(e) => handleEditSubmit(e)}>
                                    <input
                                      id="inputbar"
                                      ref={inputRef}
                                      className="w-10/12 h-8 rounded-md p-2 mt-2 ml-12 border-2 text-black"
                                      placeholder="Task..."
                                      onChange={(e) =>
                                        setTitleEdit(e.target.value)
                                      }
                                      onBlur={handleBlur}
                                      value={titleEdit}
                                    />
                                  </form>
                                </div>
                              </>
                            ) : (
                              <div className="flex w-[375px] md:w-full flex-row lg:mx-2 lg:gap-2 gap-0 lg:flex-col mx-2">
                                <div>
                                  {filter === "all" ? (
                                    <ToggleSelectar
                                      type="checkbox"
                                      className="h-8 w-6"
                                      checked={checkedItems[index] || false}
                                      onChange={() =>
                                        handleCheckboxChange(index)
                                      }
                                    />
                                  ) : null}
                                </div>
                                <div
                                  id="protext"
                                  className="  pl-4 max-h-fit md:font-medium font-sfpro md:text-lg">
                                  {item.title}
                                </div>
                              </div>
                            )}

                            <div className="h-10 w-10 pl-30">
                              {checkedItems[index] == true &&
                              filter === "all" ? (
                                <>
                                  <li className="text-green-600 text-3xl pl-8"></li>
                                </>
                              ) : (
                                <li className="text-red-600 text-3xl pl-8"></li>
                              )}
                            </div>

                            <ToggleButton
                              editTodo={editTodo}
                              handleEditSubmit={handleEditSubmit}
                              index={index}
                              editIndex={editIndex}
                              editInputRef={editInputRef}
                              deleteTodoItems={deleteTodoItems}
                            />
                          </div>
                          <div className="h-[1px] border-1 border-zinc-200 ml-[50px] w-[325px]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <AddTodo
              isactive={isactive}
              handleSubmit={handleSubmit}
              setTitle={setTitle}
              title={title}
              handleActiveSubmit={handleActiveSubmit}
            />
          </div>
        </div>
        <div className="w-[375px] md:w-full h-[34px] flex justify-center fixed bottom-0">
          <div className="h-[5px] w-[135px] bg-zinc-800"> </div>
        </div>
      </div>
    </>
  );
};

export default TodoItems;
