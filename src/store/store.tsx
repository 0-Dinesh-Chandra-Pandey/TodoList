"use client";

import { log } from "console";
import React, {
    Children,
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";
import { nanoid } from "nanoid";
import { ListItemSecondaryAction } from "@mui/material";

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (value: string) => void;
    setAsCompleted: (id: string) => void;
    deleteTodo: (id: string) => void;
};

export const GlobalContext = createContext<TodosContext | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const newTodo = localStorage.getItem("todos") || "[]";
        return JSON.parse(newTodo) as Todo[];
    });

    const handleAddTodo = (value: string) => {
        setTodos((prevData) => {
            const newTodo: Todo[] = [
                {
                    id: nanoid(),
                    title: value,
                    completed: false,
                    createdAt: new Date(),
                },
                ...prevData,
            ];
            localStorage.setItem("todos", JSON.stringify(newTodo));
            return newTodo;
        });
    };

    const setAsCompleted = (id: string) => {
        setTodos((prevData) => {
            const newTodo: Todo[] = prevData.map((item) => {
                if (item.id === id) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            });
            localStorage.setItem("todos", JSON.stringify(newTodo));
            return newTodo;
        });
    };
    
    const deleteTodo = (id: string) => {
        const cpyTodo = [...todos];
        const index = cpyTodo.findIndex(item => item.id === id);
        
        cpyTodo.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(cpyTodo));
        setTodos(cpyTodo);
    }

    return (
        <GlobalContext.Provider
            value={{ handleAddTodo, todos, setAsCompleted, deleteTodo }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export function useTodoContext() {
    const todoContextVal = useContext(GlobalContext);

    if (!todoContextVal) {
        throw new Error("Can't get the context of todos");
    }

    return todoContextVal;
}
