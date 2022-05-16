import REACT from 'react';
import './../dist/css/common.css';

const Todolist = ({todos,setTodos,setEditTodo}) =>{

const handleDelete = ({id}) =>{
    setTodos(todos.filter((todo) => todo.id !== id))
}

const handleEdit =({id})=>{
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo)
}

const completeTask = (todo) =>{

const current_title = todo.title;
const current_id = todo.id;

setTodos(
    todos.map((item)=>{
        if(item.id === todo.id)
        {
            return {...item, completed: !item.completed}
        }
        return item;
    })
)

}

    return (
        <div>
        {todos.map((todo)=>(
            <li className = {`list-items ${todo.completed ? "complete" : ""}` } >{todo.title} 
            <span class = "fa fa-trash" onClick={()=>handleDelete(todo)} ></span> 
            <span class = "fa fa-edit" onClick={()=>handleEdit(todo)}></span> 
            <span class = "fa fa-check-circle" onClick={()=>completeTask(todo)}></span></li>
        ))}
        </div>
    );
}

export default Todolist;