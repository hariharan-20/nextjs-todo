/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { changeStatus, createTodo, deleteTodo, getAllData, updateTitle } from "@/actions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ITodo } from "@/types/types";
import { createRef, useEffect, useRef, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function Home() {
  const [addTodoVal, setAddTodoVal] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [list, setList] = useState<ITodo[]>([]);
  const inputRefs = useRef(null);

  const getTodo = () => {
    getAllData().then((res) => {
      const result = res.map(todo => ({
        ...todo,
        isEditing: false,
        editingValue: '',
      }))
      // inputRefs.current = result.reduce((acc, item) => ({ ...acc, [item.id]: createRef() }), [])
      setList(result);
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const onAddTodo = async (value: string) => {
    // setIsLoading(true);
    await createTodo({ title: value })
    setAddTodoVal('')
    getTodo()
  }

  const onChangeStatus = (item: ITodo) => {
    changeStatus({ id: item.id })
    getTodo()
  }

  const onDelete = (item: ITodo) => {
    deleteTodo({ id: item.id })
    getTodo()
  }

  const onEditClick = (item: ITodo, idx: number) => {
    setList(list.map((todo) => todo.id === item.id ? { ...todo, isEditing: true } : todo))
    // if (inputRefs.current[idx].current) {
    //     inputRefs.current[idx].current?.focus()
    //   }
  }

  const onEditChange = (value: string, id: string) => {
    setList(list.map((todo) => todo.id === id ? { ...todo, editingValue: value } : todo))
  }

  const onUpdateTitle = (id: string, value: string) => {
    updateTitle({ id, value })
    getTodo()
    setList(list.map((todo) => todo.id === id ? { ...todo, isEditing: false, editingValue: value } : todo))
  }

  useEffect(() => {
    getTodo()
  }, [])


  return (
    <div className="w-screen h-screen text-center justify-center bg-gray-100 text-gray-700 pt-40">
      {/* Header */}
      <span className="text-lg">Todo App</span>
      <div className="text-sm">
        {/* Add todo */}
        <div className="flex justify-center">
          <div className="flex w-max">
            <Input type="text" name="add-todo" value={addTodoVal} onChange={(e) => setAddTodoVal(e.target.value)} placeHolder="Add todo" InputClass="h-8" />
            <Button text="Add" onClick={() => onAddTodo(addTodoVal)} buttonClass="h-8 w-20 bg-gray-600 text-white my-2 p-2" />
          </div>
        </div>
        {/* Map todo */}
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <div className="flex flex-col mt-2">
            <div className="w-1/2 self-center text-left">
              {list.map((i: ITodo, idx) => (
                <div key={i.id} className=" flex gap-2 justify-center items-center w-full">
                  <Button text={<FaCheck />} onClick={() => onChangeStatus(i)} buttonClass={`${i.isCompleted ? 'bg-green-500 text-gray-700' : 'bg-gray-600 text-white'} p-0.5 px-1 m-1 w-6 h-6`} />
                  <div className={`w-32 ${i.isCompleted ? 'line-through' : ''}`}>{i.title}</div>
                  <Button text={<FaPencil />} onClick={() => onEditClick(i, idx)} buttonClass='bg-gray-600 text-white p-0.5 px-1 m-1 w-6 h-6' />
                  {/* ref={(i) => (inputRefs.current[i.id] = i)} */}
                  <Input type="text" name="add-todo" value={i.editingValue || ''} onChange={(e) => onEditChange(e.target.value, i.id)} placeHolder="New Title" InputClass="w-32" onBlur={(e) => onUpdateTitle(i.id, e.target.value)} disabled={!i.isEditing} />
                  <Button text={<FaTrash />} onClick={() => onDelete(i)} buttonClass='bg-red-500 text-white p-0.5 px-1 m-1 w-6 h-6' />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
