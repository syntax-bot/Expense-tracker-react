import React,{useContext,useState} from 'react'
import { Globaldispatch } from '../context/GlobalState';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transaction = ({transaction}) => {
    const dispatch=useContext(Globaldispatch);
    const [isEditing, setIsEditing] = useState(false);
    const [text,setText]=useState(transaction.text);
    const [amount,setAmount]=useState(transaction.amount);
    const [mouseIn,setMouseIN]=useState(false);

    
    let sign;
    let ListClass;
    if(transaction.amount<0){
      sign='-';
      ListClass='minus';
    }
    else{
      sign='+';
      ListClass='plus';
    }
    
    let ListContent;
    if(isEditing){
      
      ListContent=(
        <li className={ListClass}>
      <form onSubmit={(e)=>{
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
            });;
        }
        const editedTransaction={
          id:transaction.id,
          text,
          amount:+amount,
          date:Date()
        }
        dispatch({type:"EDIT",payload:editedTransaction});
        setIsEditing(false);
      }}>
      <input  type="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
      <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
      <button className='save-btn' >save</button>
      </form>
      <button className='delete-btn' onClick={()=>{dispatch({
type: 'DELETE',
payload:transaction.id
});}}>x</button>
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
      </li>);

    }
    else{
      let history;
      if(mouseIn){
        history=(<div id='history'><strong>Dated:</strong>{transaction.date}</div>);
      }
      ListContent=(<li className={ListClass} onMouseOver={()=>{setMouseIN(true)}} onMouseOut={()=>{setMouseIN(false)}} >
        <span id="text">{transaction.text}</span><span id='amount'>{sign}₹{Math.abs(transaction.amount)}</span><button className='delete-btn' onClick={()=>{dispatch({
type: 'DELETE',
payload:transaction.id
});}}>x</button><button onClick={()=>{setIsEditing(true)}} className='edit-btn'>edit</button>
        {history}
    </li>);
    }

    return ListContent;
    
}

export default Transaction;
