"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;
    let newId = null;
    if (!todos.length) {
      newId = 1;
    } else {
      const lastItem = todos.slice(-1)[0];
      const lastId = lastItem?.id;
      newId = lastId + 1;
    }

    const newTask: Todo = {
      id: newId,
      text: newTodo,
      isCompleted: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const doneTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex justify-center items-center flex-col flex-wrap h-screen">
      <div className="">
        <div className="p-4 border-stone-600 border-2 rounded-md">
          <input
            className="outline-none"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            maxLength={16}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="p-4 border-stone-600 border-2 rounded-md mt-4 flex flex-col items-center gap-2 w-full">
          <h2 className="font-bold">Tasks</h2>
          {todos.map((todo) => (
            <li
              className="flex justify-between w-full px-4"
              key={todo.id}
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              <span>{todo.text}</span>
              <button
                className="bg-green-600 p-1 text-white rounded-md ml-2"
                onClick={() => doneTodo(todo.id)}
              >
                Done
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
