import React,{useContext,useState} from 'react';
import { Globaldispatch } from '../context/GlobalState';
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
        return;
      }
      const newTransaction={
        id:nextId++,
        text,
        amount:parseInt(amount)
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
    </>
  )
}

export default AddTransaction;
