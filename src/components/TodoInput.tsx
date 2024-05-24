"use client";
import React, { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTodoContext } from "@/store/store";

const TodoInput = () => {
    const [todoInput, setTodoInput] = useState("");
    const { handleAddTodo } = useTodoContext();
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddTodo(todoInput);
        setTodoInput('');
    } 

    return (
        <div className="w-[60%]">
            <form onSubmit={handleSubmit}>
                <Box
                    className="flex gap-2 items-center justify-between lg:flex-row flex-col"
                    sx={{ maxWidth: "100%" }}
                >
                    <TextField
                        autoComplete="off"
                        label="Add your todo"
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        id="fullWidth"
                        className="md:grow w-full"
                    />
                    <Button type="submit" sx={{px: 8}}
                    variant="contained" className="font-bold lg:w-auto w-full self-stretch">
                        Add
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default TodoInput;
