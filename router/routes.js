import React, { useReducer } from 'react';
import { HashRouter as Router,Route,Link,Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '../assets/css/router.scss';
import { FrontendAuth } from './frontendAuth';
import { routerConfig } from './router.config';

import Provider from '../src/components/Provider.js';
import {initState, reducer} from '../src/store/store.js';

export default function RouterBasic() {
    const [state,dispatch] = useReducer(reducer,initState);
    return(
    <TransitionGroup>
    <CSSTransition key={location.pathname} classNames="fade" timeout={800}>
        <Provider store={{state,dispatch}}>
            <Router>
            <Switch>
                <FrontendAuth config={routerConfig} />
            </Switch>
            </Router>
        </Provider>
    </CSSTransition>
    </TransitionGroup>
    )
}