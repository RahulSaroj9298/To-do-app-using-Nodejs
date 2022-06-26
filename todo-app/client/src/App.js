import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

import Items from "./components/items";

import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  });

  const addUpdate = () => {
    if (isUpdating === "") {
      axios
        .post("http://localhost:5000/api/save-todo", { text })
        .then((res) => {
          console.log(res.data);
          setText("");
        })

        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:5000/api/update-todo", {
          _id: isUpdating,
          text,
        })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
        })

        .catch((err) => console.log(err));
    }
  };

  const deleteToDo = (_id) => {
    axios
      .post("http://localhost:5000/api/delete-todo", { _id })
      .then((res) => {
        console.log(res.data);
      })

      .catch((err) => console.log(err));
  };

  const updateToDo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  };


  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Write Something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={addUpdate}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {todo.map((item) => (
            <Items
              key={item._id}
              text={item.text}
              remove={() => deleteToDo(item._id)}
              update={() => updateToDo(item._id, item.text)}
            />
          ))}
          <Items />
        </div>
      </div>
    </div>
  );
}

export default App;
