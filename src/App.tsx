import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterVuluesType = "all" | "completed" | "active";

function App() {


  let initTasks = [
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false }
  ]

  let [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
  // или вот так
  // let arr = useState(initTasks);
  // let tasks = arr[0];
  // let setTasks = arr[1];

  let [filter, setFilter] = useState<FilterVuluesType>("all");

  const removeTask = (id: string) => {
    let filterTasks = tasks.filter((t) => {
      if (t.id !== id) {
        return true
      } else { return false }
    })
    setTasks(filterTasks);
  }

  const addTask = (title: string) => {
    let newTask ={id: v1(), title: title, isDone: false};
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  const changeFilter = (value: FilterVuluesType) => {
    setFilter(value);
  }

  let taskForTodoList = tasks;
  if (filter === "completed") {
    taskForTodoList = tasks.filter(t => t.isDone === true);
  }
  if (filter === "active") {
    taskForTodoList = tasks.filter(t => t.isDone === false);
  }
  return (
    <div className="App">
      <Todolist title="What to learn"
        tasks={taskForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask} />
    </div>
  )
}



export default App;
