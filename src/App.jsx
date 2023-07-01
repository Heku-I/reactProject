import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css"



export default function App() {
  const [todos, setTodos] = useState(() => {
    const localvalue = localStorage.getItem("ITEMS")
    if (localvalue == null) return []

    return JSON.parse(localvalue)
  })


  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(), title, completed: false
        },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function deleteAll() {
      if(window.confirm("Are you sure you want to delete all tasks?"))
      setTodos([]);
  }

  function deleteCompleted(){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.completed == false)
    })
  }

  console.log(todos)

  return (
    <>
      <h1>Hello! This is your personal Todo list</h1>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} deleteAll={deleteAll} deleteCompleted={deleteCompleted} />
      <div className="buttons">
        <button className="btn btn-dark" type="reset" onClick={() => deleteCompleted()}>Delete completed tasks</button>
        <button className="btn btn-danger" type="reset" onClick={() => deleteAll()}>Delete All</button>
      </div>
    </>
  )
}