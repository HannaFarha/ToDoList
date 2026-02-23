import React from 'react';
import { useState, useEffect, useRef } from "react";
import "./task.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
const Tasks = () => {
  const [tasksData, setTasksData] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    fetch(`https://backend-einkauflist.onrender.com/task`)
      .then(response => response.json())
      .then(data => setTasksData(data));
  }, []);

  //add task
  const handleAddTodo = async event => {
    event.preventDefault()

    if (inputRef.current.value.trim() === "") {
      return toast.error("Input is required");
    } else {

      const text = inputRef.current.value;
      const newItem = { task: text };
      setTasksData([...tasksData, newItem]);

      try {
        const response = await fetch(
          `https://backend-einkauflist.onrender.com/task`,
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


  //delete task
  const handleDeleteItem = async (index) => {
    const newTask = [...tasksData];
    setTasksData(newTask)
    newTask.splice(index, 1)
    const todoToDelete = tasksData[tasksData.length - 1]
    const todoID = todoToDelete.task;
    try {
      const response = await fetch(`https://backend-einkauflist.onrender.com/task/${todoID}`, {
        method: 'DELETE',
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  }
  useEffect(() => {
    fetch('https://backend-einkauflist.onrender.com/task')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTasksData(data);
      });
  }, []);

  return (

    <div className="App2">
      <h2>Tasks</h2>
      <ToastContainer />
      <div className="to-do-container2">
        <ul className='ul'>
          {tasksData.map(({ task, createdAt }, index) => {
            return (
              <div key={index} className="item2">
                <li className='li' >
                  {task}
                  <br />
                </li>
                <span onClick={() => handleDeleteItem(index)} className="trash2">❌</span>
              </div>
            );
          })}
        </ul>

        <input className='input' required ref={inputRef} placeholder="Enter item..." />
        <button className='button' onClick={handleAddTodo}>Add</button>
      </div>
      <Link to="/">
        <button>Go Back 🔙</button>
      </Link>
    </div>
  );
};

export default Tasks;