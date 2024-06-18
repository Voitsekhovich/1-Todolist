import React, { ChangeEvent,KeyboardEvent, useRef, useState } from "react";
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
  const [taskTitle, setTaskTitle] = useState("");
  
  const addTaskHendler = () => {
    addTask(taskTitle);
    setTaskTitle("");
  };
 
  const addTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(e.currentTarget.value);

const KeyDownAddTaskHendler = (e: KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === "Enter") {
        addTaskHendler()
    }
}
const isAddTaskButtonDisabled =!taskTitle|| taskTitle.length > 25

const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>Recomended task title is 15 charters</div>

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input 
        value={taskTitle} 
        onChange={addTaskTitleHandler} 
        onKeyDown ={KeyDownAddTaskHendler}/>
        <Button
          title="+"
          onClickHandler={addTaskHendler}
          disabled={isAddTaskButtonDisabled}
        />
        {userTaskTitleLengthWarning}
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
        <Button onClickHandler={() => changeFilter("Completed")} title="Conleted" />
      </div>
    </div>
  );
};
