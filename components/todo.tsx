"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import moon from "./../public/img/icon-moon.svg";
import sun from "./../public/img/icon-sun.svg";
import { ThemeContext } from "@/components/todoLayout";
import TodoItem from "./todoItem";

export interface Props {
  id: number;
  title: string;
  isCompleted: boolean;
}

const Todo = () => {
  const { mode, setMode }: any = useContext(ThemeContext);
  const [todos, setTodos] = useState<any>([]);
  const [newtodos, setnewTodos] = useState<any>("");
  const [all, setAll] = useState<any>(false);
  const [activeAndCompleted, setActiveAndCompleted] = useState<any>([]);
  const [btnactive, setBtnactive] = useState<number>(0);

  const toggleMode = () => {
    const theme = mode === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme);
    setMode(theme);
  };

  const handleTodoInput = (e: any) => {
    e.preventDefault();
    setnewTodos(e.target.value);
  };

  const handleAll = (index: number) => {
    // setAll(!all);
    setActiveAndCompleted(todos);
    setBtnactive(index);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const generatedId = Math.floor(Math.random() * 100) + 1;
      const newValue: any = {
        id: generatedId,
        title: newtodos,
        isCompleted: false,
      };
      todos.push(newValue);
      localStorage.setItem("todo", JSON.stringify(todos));
      setActiveAndCompleted(todos);
      setnewTodos("");
      if (btnactive === 0) {
        setTodos(todos);
        setActiveAndCompleted(todos);
      } else if (btnactive === 1) {
        const filteredactivetodo: any = todos?.filter(
          (todo: { isCompleted: boolean }, _index: any) =>
            todo?.isCompleted === false
        );
        setActiveAndCompleted(filteredactivetodo);
      } else if (btnactive === 2) {
        const filteredtodocomplete: any = todos?.filter(
          (todo: { isCompleted: boolean }, _index: any) =>
            todo.isCompleted === true
        );
        setActiveAndCompleted(filteredtodocomplete);
      }
    }
  };

  const onCheck = (id: number) => {
    const filteredtodo: any = todos.find((todo: any) => todo.id === id);
    filteredtodo.isCompleted = !filteredtodo?.isCompleted;
    const updatedvalue = [...todos];
    localStorage.setItem("todo", JSON.stringify(updatedvalue));
    setActiveAndCompleted(updatedvalue);
    if (btnactive === 0) {
      setActiveAndCompleted(updatedvalue);

      setTodos(updatedvalue);
    } else if (btnactive === 1) {
      const filteredactivetodo: any = updatedvalue?.filter(
        (todo: { isCompleted: boolean }, _index: any) =>
          todo?.isCompleted === false
      );
      setActiveAndCompleted(filteredactivetodo);
      setTodos(updatedvalue);
    } else if (btnactive === 2) {
      const filteredtodocomplete: any = updatedvalue?.filter(
        (todo: { isCompleted: boolean }, _index: any) =>
          todo.isCompleted === true
      );
      setActiveAndCompleted(filteredtodocomplete);
      setTodos(updatedvalue);
    }
  };

  const filteredactivetodo: any = todos?.filter(
    (todo: { isCompleted: boolean }, _index: any) => todo.isCompleted === false
  );

  const handleActive = (index: number) => {
    if (filteredactivetodo) {
      setActiveAndCompleted(filteredactivetodo);
      setBtnactive(index);
    }
  };

  const filteredtodocomplete: any = todos?.filter(
    (todo: { isCompleted: boolean }, _index: any) => todo.isCompleted === true
  );

  const handleComplete = (index: number) => {
    if (filteredtodocomplete) {
      setActiveAndCompleted(filteredtodocomplete);
      setBtnactive(index);
    }
  };

  const handleSingleDelete = (id: number) => {
    const filteredtodo: any = todos.filter((todo: any) => todo.id !== id);
    const updatedvalue = filteredtodo;
    localStorage.setItem("todo", JSON.stringify(updatedvalue));
    if (btnactive === 0) {
      setTodos(updatedvalue);
      setActiveAndCompleted(updatedvalue);
    } else if (btnactive === 1) {
      const filteredactivetodo: any = updatedvalue?.filter(
        (todo: Props) => todo.isCompleted === false && todo?.id !== id
      );
      setTodos(updatedvalue);
      setActiveAndCompleted(filteredactivetodo);
    } else if (btnactive === 2) {
      const filteredtodocomplete: any = updatedvalue?.filter(
        (todo: Props) => todo.isCompleted === true && todo?.id !== id
      );
      setTodos(updatedvalue);
      setActiveAndCompleted(filteredtodocomplete);
    }
  };

  const handleDeleteComplete = () => {
    const filteredtodo: any = todos?.filter(
      (todo: Props) => todo.isCompleted === false
    );
    const updatedvalue = filteredtodo;
    localStorage.setItem("todo", JSON.stringify(updatedvalue));
    if (btnactive === 0) {
      setTodos(updatedvalue);
      setActiveAndCompleted(updatedvalue);
    } else if (btnactive === 1) {
      const filteredactivetodo: any = updatedvalue?.filter(
        (todo: { isCompleted: boolean }, _index: any) =>
          todo?.isCompleted === false
      );
      setTodos(updatedvalue);
      setActiveAndCompleted(filteredactivetodo);
    } else if (btnactive === 2) {
      const filteredtodocomplete: any = updatedvalue?.filter(
        (todo: { isCompleted: boolean }, _index: any) =>
          todo.isCompleted === true
      );

      setTodos(updatedvalue);
      setActiveAndCompleted(filteredtodocomplete);
    }
  };
  const buttons = [
    {
      name: "All",
      handle: handleAll,
    },
    {
      name: "Active",
      handle: handleActive,
    },
    {
      name: "Complete",
      handle: handleComplete,
    },
  ];

  useEffect(() => {
    const todo: any = localStorage.getItem("todo") || "[]";
    setTodos(JSON.parse(todo));
    setActiveAndCompleted(JSON.parse(todo));
  }, []);

  return (
    <div>
      <div
        className={`px-5 md:px-40 flex flex-col justify-center
          ${mode === "light" ? "lightbg " : "darkbg "}`}
      >
        <div className="mt-1 flex flex-row w-full lg:w-3/4 xl:w-1/2  mx-auto justify-between ">
          <div className="text-3xl font-bold text-gray-100 tracking-[0.4em]">
            TODO
          </div>
          <div>
            <Image
              src={moon}
              alt={moon}
              priority
              onClick={toggleMode}
              className={mode === "light" ? "flex" : "hidden"}
            />
            <Image
              src={sun}
              alt={sun}
              priority
              onClick={toggleMode}
              className={mode === "light" ? "hidden" : "flex"}
            />
          </div>
        </div>
        <div className="mt-5 relative">
          <input
            type="text"
            placeholder="Create a new todo..."
            onChange={handleTodoInput}
            value={newtodos}
            onKeyDown={handleKeyPress}
            className={
              mode === "light"
                ? " bg-gray-50 flex flex-row w-full lg:w-3/4 xl:w-1/2 h-12 focus:outline-0 shadow-lg rounded-lg mx-auto placeholder:text-gray-200 pl-12"
                : " bg-gray-800 flex flex-row w-full lg:w-3/4 xl:w-1/2 h-12 focus:outline-0 shadow-lg rounded-lg mx-auto placeholder:text-gray-850 pl-12"
            }
          />
          <div className=" h-5 w-5 rounded-full border border-gray-850 absolute top-3 left-4  lg:left-[102px] xl:left-[255px]"></div>
        </div>
      </div>
      <div className=" px-5 md:px-40  flex flex-col text-base justify-center relative bottom-6 md:bottom-10">
        <div
          className={` border rounded-lg w-full md:w-full lg:w-3/4 xl:w-1/2 mx-auto
            ${
              mode === "light"
                ? " border-gray-50  bg-gray-50 "
                : " border-gray-800  bg-gray-800 "
            }`}
        >
          <TodoItem
            activeAndCompleted={activeAndCompleted}
            mode={mode}
            onCheck={onCheck}
            handleSingleDelete={handleSingleDelete}
            setActiveAndCompleted={setActiveAndCompleted}
            todos={todos}
            btnactive={btnactive}
          />

          <div
            className={`flex flex-row w-full justify-between h-12 shadow-lg  rounded-bl-lg rounded-br-lg  mx-auto px-4
              ${
                mode === "light"
                  ? " bg-gray-50  text-gray-200"
                  : " bg-gray-800   text-gray-400"
              }`}
          >
            <div
              className={`self-center ${
                mode === "light" ? "  text-gray-300" : " text-gray-850 "
              }`}
            >
              {filteredactivetodo.length} items left
            </div>
            <div className="self-center hidden  lg:flex justify-between">
              {buttons.map((btn, index) => (
                <div key={index}>
                  <div
                    onClick={() => btn.handle(index)}
                    className={`ml-3 cursor-pointer font-bold  ${
                      mode === "light"
                        ? " hover:text-gray-400  text-gray-300"
                        : " text-gray-850 hover:text-gray-500"
                    }
                    ${btnactive === index ? "active " : ""}
                `}
                  >
                    {btn.name}
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={handleDeleteComplete}
              className={`self-center cursor-pointer ${
                mode === "light"
                  ? " hover:text-gray-400 text-gray-300"
                  : " text-gray-850 hover:text-gray-500"
              }`}
            >
              Clear Completed
            </div>
          </div>
        </div>
        <div
          className={`mt-4 flex lg:hidden  flex-row w-full justify-between h-12 text-sm  shadow-lg rounded-lg mx-auto px-16 
            ${
              mode === "light"
                ? " bg-gray-50  text-gray-200"
                : " bg-gray-800  text-gray-200"
            }`}
        >
          <div
            className={`self-center flex w-full justify-between
              ${mode === "light" ? "  text-gray-200 " : "  text-gray-400 "}`}
          >
            {buttons.map((btn, index) => (
              <div key={index}>
                <div
                  onClick={() => btn.handle(index)}
                  className={` cursor-pointer font-bold ${
                    mode === "light"
                      ? " hover:text-gray-400 text-gray-300"
                      : " text-gray-850 hover:text-gray-500"
                  }
                    ${btnactive === index ? "active" : ""}
                `}
                >
                  {btn.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`flex justify-center mt-4 mb-7 ${
                mode === "light" ? "  text-gray-300" : " text-gray-850 "
              }`}>
        Drag and drop to reorder list
      </div>
    </div>
  );
};

export default Todo;
