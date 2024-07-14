import React, { useRef } from "react";
import { Props } from "./todo";
import Image from "next/image";
import cross from "../public/img/icon-cross.svg";

const TodoItem = ({
  activeAndCompleted,
  mode,
  onCheck,
  handleSingleDelete,
  btnactive,
  setActiveAndCompleted,
  todos,
}: any) => {
  const dragTodo = useRef<number>(0);
  const draggedOverTodo = useRef<number>(0);
  const handleTodoSort = () => {
   
    if (btnactive === 0) {
      const todoClone = [...todos];
      const temp = todoClone[dragTodo.current];
      todoClone[dragTodo.current] = todoClone[draggedOverTodo.current];
      todoClone[draggedOverTodo.current] = temp;
      setActiveAndCompleted(todoClone);
      localStorage.setItem("todo", JSON.stringify(todoClone));
    } else if (btnactive === 1) {
      const filteredactivetodo: any = todos?.filter(
        (todo: { isCompleted: boolean }, _index: any) =>
          todo?.isCompleted === false
      );
      const todoClone = [...filteredactivetodo];
      const temp = todoClone[dragTodo.current];
      todoClone[dragTodo.current] = todoClone[draggedOverTodo.current];
      todoClone[draggedOverTodo.current] = temp;
      setActiveAndCompleted(todoClone);
     
    } else if (btnactive === 2) {
      const filteredtodocomplete: any = todos?.filter(
        (todo: { isCompleted: boolean }, _index: any) =>
          todo.isCompleted === true
      );
      const todoClone = [...filteredtodocomplete];
      const temp = todoClone[dragTodo.current];
      todoClone[dragTodo.current] = todoClone[draggedOverTodo.current];
      todoClone[draggedOverTodo.current] = temp;
      setActiveAndCompleted(todoClone);
      
    }
  };

  return (
    <div>
      {activeAndCompleted &&
        activeAndCompleted?.map((todo: Props, index: number) => (
          <div
            key={todo.id}
            draggable
            onDragStart={() => (dragTodo.current = index)}
            onDragEnter={() => (draggedOverTodo.current = index)}
            onDragEnd={handleTodoSort}
            onDragOver={(e) => e.preventDefault()}
            className={`flex flex-row justify-between text-sm md:text-base items-center w-full h-min py-3 shadow-lg  mx-auto px-4 first:rounded-tl-lg first:rounded-tr-lg border-b delete  hover:cursor-pointer
              ${
                mode === "light"
                  ? " bg-gray-50  border-b-gray-200 "
                  : " bg-gray-800  border-b-gray-400 "
              }`}
          >
            <div className="flex self-center w-11/12 ">
              
              {todo.isCompleted ? (
                <div className="flex items-center self-center w-full ">
                  <div className="">
                  <button
                    type="button"
                    className={` clicked cursor-pointer flex items-center justify-center self-center w-5 h-5 text-transparent border border-gray-300 rounded-full
                      ${mode === "light" ? "checkbox1" : "checkbox2"}`}
                    onClick={() => onCheck(todo.id)}
                  ></button>
                  </div>
                  <div
                    className={`self-center first-letter:uppercase cursor-pointer mx-4 hover:bg-gradient-radial
                      ${mode === "light" ? "td2" : "td1"}`}
                  >
                    {todo?.title}
                  </div>
                </div>
              ) : (
                <div className="flex items-center self-center w-full ">
                  <div className="">
                  <button
                    type="button"
                    className={`cursor-pointer flex items-center justify-center self-center w-5 h-5 text-transparent border border-gray-300 rounded-full
                      ${mode === "light" ? " checkbox1 " : " checkbox2 "}`}
                    onClick={() => onCheck(todo?.id)}
                  ></button>
                  </div>
                  <div className="self-center first-letter:uppercase  mx-4 cursor-pointer hover:bg-gradient-radial ">
                    {todo?.title}
                  </div>
                </div>
              )}
            </div>
            <div className="self-center cross ">
              <Image
                src={cross}
                alt={cross}
                priority
                onClick={() => handleSingleDelete(todo?.id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoItem;
