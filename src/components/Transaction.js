import React,{useContext,useState} from 'react'
import { Globaldispatch } from '../context/GlobalState';


const Transaction = ({transaction}) => {
    const dispatch=useContext(Globaldispatch);
    const [isEditing, setIsEditing] = useState(false);
    const [text,setText]=useState(transaction.text);
    const [amount,setAmount]=useState(transaction.amount);
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
      
      ListContent=(<li className={ListClass}>
      <form onSubmit={(e)=>{
        e.preventDefault();
        const editedTransaction={
          id:transaction.id,
          text,
          amount:+amount
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
      </li>);

    }
    else{
      ListContent=(<li className={ListClass}>
        {transaction.text}<span>{sign}₹{transaction.amount}</span><button className='delete-btn' onClick={()=>{dispatch({
type: 'DELETE',
payload:transaction.id
});}}>x</button><button onClick={()=>{setIsEditing(true)}} className='edit-btn'>edit</button>
    </li>);
    }

    return ListContent;
    
}

export default Transaction;
