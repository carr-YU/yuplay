import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/routes';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import 'antd/dist/antd.css';
import './assets/css/router.scss';

ReactDOM.render( <TransitionGroup>
    <CSSTransition
      appear={true}
      classNames="appAppear"
      timeout={500}
    >
      <Router/>
    </CSSTransition>
  </TransitionGroup>, document.querySelector('#root'));