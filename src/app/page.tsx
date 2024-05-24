import Todolist from "@/components/Todolist";
import TodoInput from "@/components/TodoInput";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-3xl uppercase my-12 font-bold">Todo Application</h1>
      <div className="container mx-auto flex justify-center items-center flex-col">
        <TodoInput/>
        <Suspense>
          <Todolist /> 
        </Suspense>
      </div>
    </div>
  );
}
