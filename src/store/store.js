import React from 'react';
export const storeContext = React.createContext();
export const initState = {
    user:'',
}
export const reducer = (state = initState, action)=>{
    switch (action.type){
        case 'SET_USER' :
            return {...state,user:action.data}
        default :
            return state;
    }
}