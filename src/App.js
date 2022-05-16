import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {v4 as uuidv4} from "uuid";

import logo from './logo.svg';
import './dist/css/common.css';

import Header from './components/Header';
import Todolist from './components/Todolist';


const Form = () =>{
  
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  const onInput = (event) => {
    setInput(event.target.value)
  }

  const updateTodo = (title, id, completed) =>{
    const newTodo = todos.map((todo)=>
      todo.id === id ? {title, id, completed} : todo)
    setTodos(newTodo);
    setEditTodo("");
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  })

  useEffect(()=>{
    if(editTodo)
    {
      setInput(editTodo.title)
    }
    else{
      setInput("")
    }
  },[setInput,editTodo])

  const onFormSubmit = (event) => {
  event.preventDefault();
  
if(!editTodo)
{
  setTodos([... todos, {id: uuidv4(), title: input, completed: false}])
  setInput("");
}else{
updateTodo(input, editTodo.id, editTodo.completed)
}

  
  }

  return(
  <div class="login-box">
  <div class="login-logo">
    <Header/>
  </div>
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <form action="" method="post"  onSubmit={onFormSubmit}>

        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Item you want to do." name = "name" value = {input} setInput={setInput} setTodos = {setTodos} editTodo={setEditTodo} setEditTodo = {setEditTodo}  onChange={onInput} />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-list"></span>
            </div>
          </div>
        </div>

        <div class="row">       
        <div class="col-12">
        <button type="submit" class="btn btn-primary btn-block">{editTodo ? "Ok":"Add Item"}</button>
        </div>
        </div>
        </form>    

      <div>
        <Todolist todos ={todos} setTodos = {setTodos} setEditTodo={setEditTodo}/>
        </div>
     
    </div>
  
  </div>
</div>
)}

export default Form;