"use client";

import { useState } from "react";

type TodoItem = {
    id: number;
    name: string;
    completed: boolean;
};

const initialTodos: TodoItem[] = [
    { id: 1, name: "Welcome to your new todo list!", completed: false },
    { id: 2, name: "Click the checkbox to complete a task", completed: false },
    { id: 3, name: "Click 'x' to remove a task", completed: true },
];

export default function Todo() {
    const [todolist, setTodoList] = useState<TodoItem[]>(initialTodos);
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            const newItem: TodoItem = {
                id: Date.now(),
                name: input.trim(),
                completed: false,
            };
            setTodoList((prev) => [newItem, ...prev]);
            setInput("");
        }
    };

    const handleDelete = (id: number) => {
        setTodoList(todolist.filter((t) => t.id !== id));
    };

    const handleToggleComplete = (id: number) => {
        setTodoList(
            todolist.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    return (
        <div className="mx-auto max-w-3xl p-6 font-sans mt-16 md:mt-24">
            <div className="text-left mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Daily Tasks</h2>
                <p className="mt-2 text-gray-500">
                    Add, manage, and complete your tasks for the day.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-4 border-b-2 border-gray-200 py-3 transition-colors duration-300 focus-within:border-green-500"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 appearance-none border-none bg-transparent text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
                    placeholder="What needs to be done?"
                />
                <button
                    type="submit"
                    className="text-lg font-semibold text-green-600 transition-colors hover:text-green-500"
                >
                    Add
                </button>
            </form>

            <div className="mt-8">
                {todolist.map((item) => (
                    <div
                        key={item.id}
                        className="group flex items-center justify-between border-b border-gray-200 py-6"
                    >
                        <div className="flex items-center gap-5">
                            <input
                                type="checkbox"
                                id={`todo-${item.id}`}
                                checked={item.completed}
                                onChange={() => handleToggleComplete(item.id)}
                                className="peer h-7 w-7 cursor-pointer appearance-none rounded-md border-2 border-gray-300 transition-all checked:border-green-500 checked:bg-green-500"
                            />
                            <label
                                htmlFor={`todo-${item.id}`}
                                className="flex-1 cursor-pointer text-xl text-gray-700 transition-colors peer-checked:text-gray-400 peer-checked:line-through"
                            >
                                {item.name}
                            </label>
                        </div>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-2xl text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}