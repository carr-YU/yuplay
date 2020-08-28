import * as React from 'react';
import { Route,Redirect } from 'react-router-dom';

export function FrontendAuth(props) {
    const { location,config } = props;
    const { pathname } = location;
    const isLogin = document.cookie.indexOf("token")>-1
    
    // 如果该路由不用进行权限校验，登录状态下登陆页除外
    // 因为登陆后，无法跳转到登陆页
    // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
    const targetRouterConfig = config.find((v) => v.path === pathname);
    if(targetRouterConfig && !targetRouterConfig.auth && !isLogin){
        const { component } = targetRouterConfig;
        return <Route exact path={pathname} component={component} />
    }

    //  登陆状态
    if(isLogin){
        if(pathname === '/'){
            return <Redirect to='/home' />
        }
        // 如果是登陆状态，想要跳转到登陆，重定向到主页
        if(pathname === '/login'){
            return <Redirect to='/home' />
        }else{
            // 如果路由合法，就跳转到相应的路由
            if(targetRouterConfig){
                return <Route path={pathname} component={targetRouterConfig.component} />
            }else{
                // 如果路由不合法，重定向到 404 页面
                return <Redirect to='/404' />
            }
        }
    }else{
        if(pathname === '/'){
            return <Redirect to='/login' />
        }
        // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
        if(targetRouterConfig && targetRouterConfig.auth){
            return <Redirect to='/login' />
        }else{
            // 非登陆状态下，路由不合法时，重定向至 404
            return <Redirect to='/404' />
        }
    }
}