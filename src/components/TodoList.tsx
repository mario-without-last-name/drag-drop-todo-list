// import React from 'react'
// import './styles.css';
// import { TodosInterface } from '../model';
// import SingleTodo from './SingleTodo';
// import { Droppable } from 'react-beautiful-dnd';

// interface Props{
//   todos:TodosInterface[];
//   setTodos:React.Dispatch<React.SetStateAction<TodosInterface[]>>; // Obtained by hovering over the "setTodo" text in the <InputField> in App.tsx
//   completedTodos:TodosInterface[];
//   setCompletedTodos:React.Dispatch<React.SetStateAction<TodosInterface[]>>;
// }

// const TodoList:React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
//   return (
//     // <div className='todos'>
//     //   {todos.map(currentTodo => (
//     //   <SingleTodo todo={currentTodo} key={currentTodo.id} todos={todos} setTodos={setTodos}/>
//     // ))}
//     // </div>
//     <div className="container">
//       <Droppable droppableId='OptionalTaskss'>
//         {(provided) => (
//           <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
//             <span className="todos__heading">Optional Tasks</span>
//             {todos.map((currentTodo, index) => (
//               <SingleTodo index={index} todo={currentTodo} key={currentTodo.id} todos={todos} setTodos={setTodos}/>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//       <Droppable droppableId='UrgentTasks'>
//         {(provided) => (
//           <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
//             <span className="todos__heading">Urgent Tasks</span>
//             {completedTodos.map((currentTodo, index) => (
//               <SingleTodo index={index} todo={currentTodo} key={currentTodo.id} todos={completedTodos} setTodos={setCompletedTodos}/>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   )
// }

// export default TodoList

import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Prioritas Rendah</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Prioritas Tinggi</span>
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;