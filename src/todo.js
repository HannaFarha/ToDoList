import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from './dropdown';
import { Link } from 'react-router-dom';

function Todo() {
    const [title, setTitle] = useState([]);
    const [confirmDeleteAll, setConfirmDeleteAll] = useState(false)
    const inputRef = useRef();

    const handleAddTodo = async event => {
        event.preventDefault()

        if (inputRef.current.value.trim() === "") {
            return toast.error("Input is required");
        } else {
            const text = inputRef.current.value;
            const newItem = { completed: false, title: text };
            setTitle([...title, newItem]);

            try {
                const response = await fetch(
                    `https://backend-einkauflist.onrender.com/todo`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newItem),
                    }
                )
                if (response.status === 201) {
                }
            } catch (error) {
                console.error(error)
            }
        }
        inputRef.current.value = "";
    }

    const handleItemDone = (index) => {
        const newTodos = [...title];
        newTodos[index].completed = !newTodos[index].completed;
        setTitle(newTodos);
    };

    const handleDeleteItem = async (index) => {
        const newTodos = [...title];
        setTitle(newTodos)
        newTodos.splice(index, 1)
        const todoToDelete = title[title.length - 1]
        const todoID = todoToDelete.title;
        try {
            const response = await fetch(`https://backend-einkauflist.onrender.com/${todoID}`, {
                method: 'DELETE',
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }

    }
    const handleDeleteAll = async () => {
        setConfirmDeleteAll(true);
    };
    const handleConfirmDeleteAll = async () => {
        try {
            const response = await fetch(`https://backend-einkauflist.onrender.com/all/done`, {
                method: 'DELETE',
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        setTitle([]);
        setConfirmDeleteAll(false);
    };

    const handleCancelDeleteAll = () => {
        setConfirmDeleteAll(false);
    };

    const handleSelect = async (option) => {
        const text = option.label;


        if (title.some(item => item.title === text)) {
            return toast.error("Item already exists");
        } else {
            const newItem = { completed: false, title: text };
            setTitle([...title, newItem]);
            try {
                const response = await fetch(
                    `https://backend-einkauflist.onrender.com/todo`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newItem),
                    }
                )
                if (response.status === 201) {
                    // handle success
                }
            } catch (error) {
                console.error(error)
            }
        };
    }

    useEffect(() => {
        fetch('https://backend-einkauflist.onrender.com/')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log(data);
                setTitle(data);
            });
    }, []);

    return (
        <div className="App">
            <Link to="/tasks">
                <button className="answer-btn">Tasks</button>
            </Link>
            <h1>Shopping List</h1>
            <ToastContainer />
            <div className="to-do-container">
                <ul>
                    {title.map(({ title, completed }, index) => {
                        return (
                            <div key={title} className="item">
                                <li
                                    className={completed ? "done" : ""}

                                    onClick={() => handleItemDone(index)}
                                >
                                    {title}
                                </li>
                                <span onClick={() => handleDeleteItem(index)} className="trash">❌</span>
                            </div>
                        );
                    })}
                </ul>

                <input required ref={inputRef} placeholder="Enter item..." />
                <button onClick={handleAddTodo}>Add</button>
                <button onClick={handleDeleteAll}>❌ Delete All ❌</button>
                {confirmDeleteAll && (
                    <div className="confirm-delete-all">
                        <p>Are you sure you want to delete all items?</p>
                        <button className="yes-button" onClick={handleConfirmDeleteAll}>Yes, delete all</button>
                        <br />
                        <button className="cancel-button" onClick={handleCancelDeleteAll}>Cancel</button>
                    </div>
                )}
            </div>

            {!confirmDeleteAll && (<Dropdown handleSelect={handleSelect} />)}
        </div>
    );
}

export default Todo;