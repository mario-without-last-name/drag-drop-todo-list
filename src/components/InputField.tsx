// import React, { useRef } from 'react';
// import './styles.css';

// interface Props{
//   todo:string;
//   setTodo:React.Dispatch<React.SetStateAction<string>>; // Obtained by hovering over the "setTodo" text in the <InputField> in App.tsx
//   handleAdd: (e:React.FormEvent) => void;
// }

// // const InputField = ({todo, setTodo}:{todo:string; setTodo:React.Dispatch<React.SetStateAction<string>>;}) => (
// // const InputField = ({todo, setTodo}:Props) => (
// const InputField:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
//   const inputRef = useRef<HTMLInputElement>(null); // See "<HTMLInputElement>"" by hovering on <input>
//     return(
//       <form className='input' onSubmit={(e) => {handleAdd(e); inputRef.current?.blur();}}>
//         <input type='input' value={todo} ref={inputRef} onChange={(e)=>setTodo(e.target.value)} placeholder='Enter a task' className='input__box'/>
//         <button className='input__submit' type='submit'>Go</button>
//       </form>
//     )
//   }

// export default InputField

import React, { useRef } from "react";
import "./styles.css";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input__submit">
        GO
      </button>
    </form>
  );
};

export default InputField;