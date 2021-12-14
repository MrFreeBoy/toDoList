import React, {ChangeEvent, useState} from 'react';
import {v1} from "uuid";

type AddItemsFormPropsType={
    addItem: (title: string)=>void
}

const AddItemForm = (props: AddItemsFormPropsType) => {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false)


    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }


    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
    }

    const errorClass = error ? "error" : ""
    const errorMassage = error
        ? <div style={{color: "red"}}>Ошибка</div>
        : null

    return (
        <div>
            <input
                value={title}
                onChange={ changeTitle}
                onKeyPress={onKeyPressAddItem}
                className={errorClass}
            />
            <button onClick={addItem}>+</button>
            {error && errorMassage}
        </div>
    );
};

export default AddItemForm;