import { useTodoContext } from "@/store/store";
import React from "react";

const TodoCard = ({id, completed, title}) => {
    const { setAsCompleted, deleteTodo } = useTodoContext();
    
    return (
        <div
            key={id}
            className="p-2 flex justify-between items-center border-b-[2px] 
                            border-gray-300"
        >
            <div className="scale-[1.5] px-2 py-2">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => setAsCompleted(id)}
                />
            </div>
            <div className="py-2 px-2 grow">
                <p>{title}</p>
            </div>
            <div className="">
                {completed && (
                    <button
                        onClick={() => deleteTodo(id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoCard;
