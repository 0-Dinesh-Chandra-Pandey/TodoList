"use client";
import { useTodoContext } from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Todolist = () => {
    const { todos, setAsCompleted, deleteTodo } = useTodoContext();

    let filterTodos = todos;
    const params = useSearchParams();
    const todoUrl = params.get("todos");

    if (todoUrl === "active") {
        filterTodos = filterTodos.filter((todo) => !todo.completed);
    } else if (todoUrl === "completed") {
        filterTodos = filterTodos.filter((todo) => todo.completed);
    }

    return (
        <div className="w-[60%] my-8">
            <ul className="flex justify-between">
                <li>
                    <Link
                        href="/"
                        className={`${todoUrl === null ? "active" : ""}`}
                    >
                        All
                    </Link>
                </li>
                <li>
                    <Link
                        href="/?todos=active"
                        className={`${todoUrl === "active" ? "active" : ""}`}
                    >
                        Active
                    </Link>
                </li>
                <li>
                    <Link
                        href="/?todos=completed"
                        className={`${todoUrl === "completed" ? "active" : ""}`}
                    >
                        Completed
                    </Link>
                </li>
            </ul>
            <div className="border my-4 h-[400px]">
                {filterTodos.map((items) => {
                    return (
                        <div
                            key={items.id}
                            className={`p-2 flex justify-between items-center border-b-[2px] 
                        border-gray-300`}
                        >
                            <div
                                className={`scale-[1.5] px-2 py-2 ${
                                    items.completed
                                        ? "opacity-30"
                                        : "opacity-100"
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={items.completed}
                                    onChange={() => setAsCompleted(items.id)}
                                />
                            </div>
                            <div
                                className={`py-2 px-2 grow ${
                                    items.completed
                                        ? "opacity-30"
                                        : "opacity-100"
                                }`}
                            >
                                <p>{items.title}</p>
                            </div>
                            <div className="self-stretch">
                                {items.completed && (
                                    <button
                                        onClick={() => deleteTodo(items.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Todolist;
