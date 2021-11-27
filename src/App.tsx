import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL:
    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "JS", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")


    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    // const tasks = result[0]
    // const setTasks = result [1]

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID)) // асинхронная функция 5-10мс
        console.log(tasks)
    }
    let tasksForRender = tasks
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }
    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;

function setTasks(arg0: any) {
    throw new Error('Function not implemented.');
}

