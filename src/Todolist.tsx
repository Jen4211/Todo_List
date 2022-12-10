
import React, { KeyboardEvent, ChangeEvent, useState } from "react"
import { FilterVuluesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}


type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterVuluesType) => void;
  addTask: (title: string) => void;
}

export const Todolist = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onCheangeNewTaskHender = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  };

  const onKeyPressHender = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle("")
  };

  const onAllClickHandle = () => { props.changeFilter("all") }
  const onActiveClickHandle = () => { props.changeFilter("active") }
  const onCompletedClickHandle = () => { props.changeFilter("completed") }


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onCheangeNewTaskHender}
          onKeyPress={onKeyPressHender}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>{props.tasks.map((t) => {
        const onRemoveHandler = () => {
          props.removeTask(t.id)
        }
        return (<li key={t.id}>
          <input type="checkbox" checked={t.isDone} />
          <span>{t.title}</span>
          <button onClick={onRemoveHandler}>X</button>
        </li>)
      })
      }
      </ul>
      <div>
        <button onClick={onAllClickHandle}>All</button>
        <button onClick={onActiveClickHandle}>Active</button>
        <button onClick={onCompletedClickHandle}>Completed</button>
      </div>
    </div>
  )
}

