// import React, { useEffect, useRef, useState } from 'react'
// import { TodosInterface } from '../model'
// import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
// import { MdDone } from 'react-icons/md';
// import './styles.css';
// import { Draggable } from 'react-beautiful-dnd';

// type Props = {
//   index:number;
//   todo:TodosInterface;
//   todos:TodosInterface[];
//   setTodos:React.Dispatch<React.SetStateAction<TodosInterface[]>>;
// }

// const SingleTodo:React.FC<Props> = ({index, todo, todos, setTodos}) => {

//   const [edit, setEdit] = useState<boolean>(false);
//   const [editTodo, setEditTodo] = useState<string>(todo.todo);

//   const handleDone = (id:number) => {
//     setTodos( todos.map( (todo) => (todo.id === id ? {...todo, isDone: !todo.isDone} : todo) ) );
//   };

//   const handleDelete = (id:number) => {
//     setTodos( todos.filter((todo) => (todo.id !== id) ) );
//   };

//   const handleEdit = (e: React.FormEvent, id: number) => {
//     e.preventDefault();
//     setTodos( todos.map( (todo) => (todo.id === id ? {...todo, todo:editTodo} : todo) ) );
//     setEdit(false);
//   }

//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, [edit]);

//   return (
//     <Draggable draggableId={todo.id.toString()} index={index}>
//       {(provided) => (
//         <form className='todos__single' onSubmit={(e) => handleEdit(e,todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
//           {edit ? ( <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos__single--text'/> ) : 
//           todo.isDone ? (<s className="todos__singe--text">{todo.todo}</s>) : (<span className="todos__singe--text">{todo.todo}</span>)}
//           <div>
//             <span className="icon" onClick={()=>{if (!edit && !todo.isDone) {setEdit(!edit)}}}><AiFillEdit/></span>
//             <span className="icon" onClick={()=>handleDelete(todo.id)}><AiFillDelete/></span>
//             <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone/></span>
//           </div>
//         </form>
//       )}
//     </Draggable>
//   )
// }

// export default SingleTodo

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;