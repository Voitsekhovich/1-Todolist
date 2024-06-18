import React, { useRef } from "react";
import { FilterValueType } from "./App";
import { Button } from "./Button";

export type TodolistPropsType = {
  title: string;
  tasks: Array<TaskPropsType>;
  removeTask: (taskId: string) => void;
  changeFilter: (newFilterValue: FilterValueType) => void;
  addTask: (title: string) => void;
};

export type TaskPropsType = {
  id: string;
  isDone: boolean;
  title: string;
};

export const Todolist = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
}: TodolistPropsType) => {
  const taskInputRef = useRef<HTMLInputElement>(null);
  const addTaskHandler = () => {
    if (taskInputRef.current) {
      addTask(taskInputRef.current.value);
      taskInputRef.current.value = "";
    }
  };
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={taskInputRef} />
        <Button title="+" onClickHandler={addTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />{" "}
                <span>{task.title}</span>
                <Button onClickHandler={() => removeTask(task.id)} title="x" />
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <Button onClickHandler={() => changeFilter("All")} title="All" />
        <Button onClickHandler={() => changeFilter("Active")} title="Active" />
        <Button
          onClickHandler={() => changeFilter("Completed")}
          title="Conleted"
        />
      </div>
    </div>
  );
};
