import React,{useContext,useState} from 'react';
import { Globaldispatch } from '../context/GlobalState';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let nextId=0;
const AddTransaction = () => {
    const [text,setText]=useState('');
    const [amount,setAmount]=useState('');
    const dispatch=useContext(Globaldispatch);
  return (
    <>
    <h3>Add new transaction</h3>
    <form id='form' onSubmit={(e)=>{
      e.preventDefault();
      if(text.length===0 || amount.length===0){
        return toast.error('Enter Valid Text and Amount', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      const newTransaction={
        id:nextId++,
        text,
        amount:parseInt(amount),
        date:Date()
      }
      dispatch({type:'ADD',payload:newTransaction});

    }}>
        <div className='form-control'>
            <label htmlFor="text">Text</label>
            <input type="text"  id="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder='Enter text....'/>
        </div>
        <div className='form-control'>
            <label htmlFor="amount">Amount (negative - expense, positive - income)</label>
            <input type="number" id="amount" value={amount} onChange={(e)=>setAmount(e.target.value)}  placeholder='Enter amount....'/>
        </div>
        <button  className='btn'>Add transaction</button>
    </form>
    <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
     
    </>
  )
}

export default AddTransaction;
