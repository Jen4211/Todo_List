
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
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterVuluesType
}

export const Todolist = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null)

  const onCheangeNewTaskHender = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  };

  const onKeyPressHender = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle("")
    } else { setError("Field is required") }

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
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>{props.tasks.map((t) => {
        const onRemoveHandler = () => {
          props.removeTask(t.id)
        }
        const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
          props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (<li key={t.id}
          className={t.isDone ? "is__done" : ""} >
          <input type="checkbox"
            onChange={onChangeHandle}
            checked={t.isDone}
          />
          <span>{t.title}</span>
          <button onClick={onRemoveHandler}>X</button>
        </li>)
      })
      }
      </ul>
      <div>
        <button onClick={onAllClickHandle}
        className={props.filter === 'all' ? "active__filter" : ""}>All</button>
        <button onClick={onActiveClickHandle}
        className={props.filter === 'active' ? "active__filter" : ""}>Active</button>
        <button onClick={onCompletedClickHandle}
        className={props.filter === 'completed' ? "active__filter" : ""}>Completed</button>
      </div>
    </div>
  )
}

