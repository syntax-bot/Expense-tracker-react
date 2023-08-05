import React,{useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
const Balance= () => {
  const {transactions}=useContext(GlobalContext);
  const values=transactions.map((transaction)=>transaction.amount);
  const value=values.reduce((acc,item)=>(acc+=item),0).toFixed(2);
  return (
    <>
    <h4>Your balance</h4>
    <h1 id='balance'>INR ₹{value}</h1>
    </>
  );
}

export default Balance;

