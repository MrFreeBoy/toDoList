import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void

}

function TodoList(props: PropsType) {

    let [title, setTitle] = useState("");
    const [error, setError] = useState<boolean>(false)

    function addTask(title: string) {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id);
            setTitle("");
        } else {
            setError(true)
        }

    }

    const tasksJSX = props.tasks.map(task => {   //рендеринг списков с помощью методов map
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const removeTask = () => props.removeTask(task.id, props.id)
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeStatus}
                />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id, props.id)}>x</button>
            </li>
        ) // Клик по кнопке onClick, если мы нажали - функция выполняется
    })

    const errorClass = error ? "error" : ""
    const errorMassage = error
        ? <div style={{color: "red"}}>Ошибка</div>
        : null


    // const getBtnClass = props.filter ==="all" ? "active": ""
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value)
                    }}
                    className={errorClass}
                />
                <button onClick={() => {
                    addTask(title)
                }}>+
                </button>
                {error && errorMassage}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>


    )

}

export default TodoList;