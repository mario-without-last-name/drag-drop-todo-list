// import React, { useState } from 'react';
// import './App.css';
// import InputField from './components/InputField';
// import { TodosInterface } from './model';
// import TodoList from './components/TodoList';
// import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// let name = "Mario"; // Implicitly string type
// let name2:string = "Mario"; // Explicitly string type
// // name = 5; name2 = 5; // Will cause error, strict type checking
// name = "Luigi"; name2 = "Luigi";
// let age:number = 10;
// // age = name; // two variable have different type, error
// let isMarried:boolean = true;
// let hobbies:string[] = ["aaa", "bbb", "ccc"]; 
// let scores:number[] = [90, 100, 56];
// let role:[number, string, boolean, number[]] = [5, "zzz", false, [1,2,3]];
// let person:Object; // Not recommended
// type PersonObject = {
//   name: string;
//   age: number;
//   legalAge?: boolean;
// }
// let person2:PersonObject = {
//   name: "Piyush",
//   age: 20, // age and name properties are a must. without them = error
//   // legalAge is optional
// };
// let lotsOfPeople:PersonObject[] = [
//   {name: "Alex", age: 80}, {name: "Alexandra", age: 12, legalAge: false}
// ]
// let password:number|string;
// password = 5; password = "fff"
// // function printName(password) { console.log(password); } // Error, "password" implicitly has "any" type
// function printSomething(something:string) { console.log(something); }
// printSomething("g");
// // let printSomething2: Function; // Not recommended
// let printSomething2: (car:string) => number; // return type can be number, void, string, or custom return type
// let printSomething3: (car:string) => never; // "void" returns undefined, "never" does not return anything
// // let anything:any; // Not recommended
// let anything:unknown;
// anything = "gasd"; anything = 13; anything: false; anything: [["gsi", 8], -3]
// // name = anything; // Again, different types, so error
// type MonsterName = { name: string; };
// type MonsterIdentity = MonsterName & { element: string; };
// let Pikachu:MonsterIdentity = {name: "Pikachu", element: "Lightning"};
// interface Monster2Name { name: string; };
// interface Monster2Identity extends Monster2Name { element: string };
// type Monster2Class = Monster2Identity & { class:number }
// interface Monster2Stats extends Monster2Class { hp:number; damage:number }
// // class Bulbasaur extends Monster2Identity {}; // Error ?




// // function App() {
// //   return (
// //     <div className="App">
// //       Hello World
// //     </div>
// //   );
// // }

// const App:React.FC = () => { // React.FC -> React Functional Component
//   const [todo, setTodo] = useState<string>(""); // if using usestate("") or usestate<string>(""), it will become type string. if using usestate(), it will become type undefined. if using usestate<string>(), it will become string | undefined, <string | number>, etc...
//   const [todos, setTodos] = useState<TodosInterface[]>([]);
//   const [completedTodos, setCompletedTodos] = useState<TodosInterface[]>([]);

//   const handleAdd = (e:React.FormEvent) => {
//     e.preventDefault(); // Prevent browser from refreshing
//     if (todo) {
//       setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
//       setTodo("");
//     }
//   };

//   const onDragEnd = (result:DropResult) => {
//     console.log(onDragEnd);
//   }

//   return(
//     <DragDropContext onDragEnd={() => {}}>
//       <div className="App">
//         <span className='heading'>Mario's Task Manager</span>
//         <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
//         <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
//       </div>
//     </DragDropContext>
//   );
// };

// export default App;

import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;