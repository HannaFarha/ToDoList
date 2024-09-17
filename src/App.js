import { useRef, useState } from 'react';
import './App.css';

function App() {
  const[todos, setTodos]= useState(["test"])
  const inputRef = useRef()
  const handleAddTodo=()=>{
    const text =inputRef.current.value;
const newItem={completed:false,text}

    setTodos([...todos, newItem])
    console.log(text)
  }
  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
      <ul>
        {todos.map((item)=>{return <li>{item.text}</li>})}


      </ul>
      <input ref={inputRef} placeholder="Enter item..."/>
      <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
