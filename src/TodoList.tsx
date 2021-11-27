import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

function TodoList(props: PropsType) {

    let [title, setTitle] = useState("");

    function addTask(title: string) {
        props.addTask(title);
        setTitle("");
    }

    const tasksJSX = props.tasks.map(task => {   //рендеринг списков с помощью методов map
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        ) // Клик по кнопке onClick, если мы нажали - функция выполняется
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={(e) => {setTitle(e.currentTarget.value)}}
                />
                <button onClick={() => {addTask(title)}}>+</button>
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