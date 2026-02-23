import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Tasks from './task.js';
import Todo from "./todo.js"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>

    </div>
  );
}

export default App;