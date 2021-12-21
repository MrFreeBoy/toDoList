import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: PropsType) {


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };

    const changeTodoListTitle = (newTitle: string) =>{
        props.changeTodoListTitle(newTitle, props.id)
    }

    const setAllFilterValue = () => props.changeFilter("all", props.id)
    const setActiveFilterValue = () => props.changeFilter("active", props.id)
    const setCompletedFilterValue = () => props.changeFilter("completed", props.id)
    const getBtnClass = (filter: FilterValuesType) => props.filter=== filter ? "active" : "" ;

    const tasksJSX = props.tasks.map(task => {   //рендеринг списков с помощью методов map
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (newTitle:string) => {props.changeTaskTitle(task.id, newTitle, props.id)}

        const removeTask = () => props.removeTask(task.id, props.id)
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeStatus}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={() => props.removeTask(task.id, props.id)}>x</button>
            </li>
        ) // Клик по кнопке onClick, если мы нажали - функция выполняется
    })

    // const getBtnClass = props.filter ==="all" ? "active": ""
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={() => props.removeTodoList(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={getBtnClass("all")}
                    onClick={setAllFilterValue}>All</button>
                <button
                    className={getBtnClass("active")}
                    onClick={setActiveFilterValue}>Active</button>
                <button
                    className={getBtnClass("completed")}
                    onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>


    )

}

export default TodoList;