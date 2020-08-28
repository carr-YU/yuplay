import React from 'react';
import {storeContext} from '../store/store.js';
export default function Provider(props){
    return (
        <storeContext.Provider value={props.store}>
            {props.children}
        </storeContext.Provider>
    )
}