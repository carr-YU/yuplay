import React,{useEffect,useRef,useState,useContext} from 'react';
import '../../assets/css/home.scss';
import AudioComponent from './audio.js';
import {storeContext} from '../store/store.js';
import ReactLive2d from 'react-live2d';
import Menu from './menu.js';

function Home (){
    const {state,dispatch}= useContext(storeContext);
    return (<div>
        <Menu></Menu>
        <ReactLive2d style={{'z-index':100}} width={300} height={400} ModelList={['Rice']} TouchBody={['']} TouchHead={['']} color={'#fff'}/>
        <AudioComponent></AudioComponent>
    </div>)
}

export default Home;