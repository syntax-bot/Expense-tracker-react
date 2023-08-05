import React,{useReducer,createContext} from "react";


const initialState={
    transactions:[
    
   ]
}
export const GlobalContext=createContext(initialState);
export const Globaldispatch=createContext(null);

export default function GlobalProvider ({ children }){
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (<GlobalContext.Provider value={{
    transactions: state.transactions
  }}>
    <Globaldispatch.Provider value={dispatch}>{children}</Globaldispatch.Provider>
  </GlobalContext.Provider>);
}


function AppReducer (state, action){
    switch(action.type) {
      case 'DELETE':
        return {
          ...state,
          transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
        }
      case 'ADD':
        return {
          ...state,
          transactions: [action.payload, ...state.transactions]
        }
      case 'EDIT':
        return {
          ...state,
          transactions: state.transactions.map(transaction=>{
            if(transaction.id===action.payload.id){
              return action.payload;
            }
            else{
              return transaction;
            }

          })
        }
      default:
        return state;
    }
  }

