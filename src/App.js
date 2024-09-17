import { useState } from 'react';
import './App.css';

function App() {
  const[todos, setTodos]= useState(["test"])
  return (
    <div className="App">
      <h2>To Do List</h2>
      <ul>
        {todos.map((item)=>{return <li>{item}</li>})}


      </ul>
      <input />
      <button>Add</button>
    </div>
  );
}

export default App;
