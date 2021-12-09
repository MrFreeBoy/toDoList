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

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([

        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},

    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BEER", isDone: true},
            {id: v1(), title: "BREAD", isDone: false},
            {id: v1(), title: "FISH", isDone: false},
        ]
    })


    //BLL:

    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        const updatedTodolist = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl)
        setTodoLists(updatedTodolist)
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyState)
    }

    const addTask = (title: string, todoListID: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const copyState = {...tasks}
        copyState[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyState)
    }

    const removeTask = (taskID: string, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyState)
    }


    const todoListComponents = todoLists.map(tl => {
        let tasksForRender = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForRender = tasksForRender.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForRender = tasksForRender.filter(t => t.isDone)
        }
        return <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForRender}
            filter={tl.filter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
        />
    })

    //UI:

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;

function setTasks(arg0: any) {
    throw new Error('Function not implemented.');
}

