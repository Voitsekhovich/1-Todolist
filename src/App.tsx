import React from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskPropsType, Todolist } from "./Todolist";

export type FilterValueType = "All" | "Active" | "Completed";

function App() {
  const [tasks, setTasks] = React.useState<Array<TaskPropsType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);

  const removeTask = (taskId: string) => {
    const nextState = tasks.filter((t) => t.id !== taskId);
    setTasks(nextState);
  };

  const addTask = (title: string) => {
    const newTask: TaskPropsType = {
      id: v1(),
      title,
      isDone: false,
    };
    
    setTasks([...tasks,newTask]);
  };

  const [filter, setFilter] = React.useState<FilterValueType>("All");

  let filterTaskForTodelist: Array<TaskPropsType> = tasks;
  if (filter === "Active") {
    filterTaskForTodelist = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "Completed") {
    filterTaskForTodelist = tasks.filter((t) => t.isDone === true);
  }

  const changeFilter = (newFilterValue: FilterValueType) => {
    setFilter(newFilterValue);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={filterTaskForTodelist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask }
      />
    </div>
  );
}

export default App;
