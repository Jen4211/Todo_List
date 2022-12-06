import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterVuluesType = "all" | "completed" | "active";

function App() {


  let initTasks = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false }
  ]

  let [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
  // или вот так
  // let arr = useState(initTasks);
  // let tasks = arr[0];
  // let setTasks = arr[1];

  let [filter, setFilter] = useState<FilterVuluesType>("all");

  const removeTask = (id: number) => {
    let filterTasks = tasks.filter((t) => {
      if (t.id !== id) {
        return true
      } else { return false }
    })
    setTasks(filterTasks);
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
        changeFilter={changeFilter} />
    </div>
  )
}



export default App;
