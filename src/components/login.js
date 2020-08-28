// import React,{useEffect,useRef,useState, useContext} from 'react';
// import {useHistory} from 'react-router-dom';
// import cloudPng from '../../assets/img/cloud_base64';
// import '../../assets/css/login.scss';
// import { SmileOutlined, LockOutlined, LoadingOutlined} from '@ant-design/icons';
// import { message } from 'antd';
// import axios from '../../assets/utils/axiosErrorHandler';
// import {url} from '../../assets/utils/axiosUrl';
// import Verify5 from 'verify5-html';
// const md5 = require('md5');
// import {storeContext} from '../store/store.js';


// function Login(props){
//     console.log("props",props);
//     return(<div className="wrap">
//         <LoginBackground>
//         </LoginBackground>
//         <LoginModal></LoginModal>
//     </div> )
// }

// //登录框模块
// function LoginModal(){
//     const userName = useRef(null);
//     const password = useRef(null);
//     const [sign,setSign] = useState(null);
//     const [loging,setLoging] = useState(false);
//     const [V5,setV5] = useState(null);
//     const [btnStatus,setBtnStatus] = useState('normal');
//     let history = useHistory();
//     const {state,dispatch}= useContext(storeContext);
//     useEffect(() => {
//         //获取token
//         var params = {
//             appid:"cc423e32ddd5419a9fb4286be3d29692",
//             timestamp:Date.now()
//         }
//         axios({
//             url:url+'/api/v5-getToken',
//             data:params,
//             method:'post',
//         })
//         .then((response)=>{
//             if(response.data && response.data.code == "000"){
//                 //  人机验证模块
//                 console.log("🍎",response.data.token)
//                 setV5(new Verify5({//每次验证都要创建新的Verify5实例
//                     host:"freetvks2vi2.verify5.com",//从后台getToken接口获得
//                     token:response.data.token//从后台getToken接口获得
//                 }))
//             }else{
//                 message.error(response.data.msg);
//             }
//         })
//     }, []);
//     //登录操作
//     function login(){
//         let name = userName.current.value;
//         let pwd = password.current.value;
//         if(!name || name == ''){
//             message.error("请输入用户名");
//             return;
//         }
//         if(!pwd || pwd == ''){
//             message.error("请输入密码");
//             return
//         }
//         if(btnStatus != 'success'){
//             message.error("请先通过验证");
//             return
//         }
//         pwd = md5(pwd);
//         setLoging(true);
//         axios({
//                 url:url+'/api/login',
//                 data:{username:name,password:pwd},
//                 method:'post',
//             })
//             .then((response)=>{
//                 setTimeout(function(){
//                     setLoging(false);
//                     let data = response.data;
//                     if(data.code != '000'){
//                         message.error(data.res);
//                         return
//                     }
//                     history.push('/home')
//                 },1000)
//             }).catch((e)=>{
//                 console.log(e);
//                 message.error(e);
//             })
//     }
//     //按下enter键登陆
//     function enterLogin(event){
//         if(event.keyCode == 13){
//             login();
//         }
//     }
//     function validate(){
//         if(!V5){
//             return;
//         }
//         dispatch({type:'SET_USER',data:'yukaimin'})
//         setBtnStatus("ing")
//         V5.verify(function(result){
//             var success=result.success;
//             if(success){
//                 var verifyId=result.verifyId;
//                 //TODO 将verifyId提交到应用服务器请求二次验证
//                 console.log(verifyId);
//                 //组装参数
//                 var params = {
//                     verifyid:verifyId,
//                     token:"250910e04c1f476fb700cfe00db3819a",
//                     timestamp:Date.now()
//                 }
//                 axios({
//                     url:url+'/api/v5-validate',
//                     data:params,
//                     method:'post',
//                 })
//                 .then((response)=>{
//                     if(response.data && response.data.code == '000'){
//                         //验证成功
//                         setBtnStatus("success")
//                     }else{
//                         //验证失败
//                         setBtnStatus("fail")
//                     }
//                 })
//             }
//         });
//     }


//     return(
//         <div className={["login-modal-wrap",loging?"loging":null].join(" ")}>
//             <div className="modal-title">欢迎🎉🎉{state.user}</div>
//             <div className="modal-form">
//                 <div className={["modal-user",sign == "userName"?"active":null].join(" ")}>
//                     <label htmlFor="userName"><SmileOutlined className="modal-icon"/></label>
//                     <input ref={userName} onFocus={()=>setSign('userName')} onBlur={()=>setSign(null)} onKeyUp={()=>enterLogin(event)} id="userName" type="text" className="modal-input" autoComplete="off" placeholder="注册时的手机号或邮箱" maxLength="320"/>
//                 </div>
//                 <div className={["modal-pwd",sign == "password"?"active":null].join(" ")}>
//                     <label htmlFor="password"><LockOutlined className="modal-icon"/></label>
//                     <input ref={password} onFocus={()=>setSign('password')} onBlur={()=>setSign(null)} onKeyUp={()=>enterLogin(event)} id="password" type="password" className="modal-input" placeholder="请输入密码" maxLength="32"/>
//                 </div>
//                 <div className={["v5-btn-custom","v5-validation-btn",btnStatus != 'normal'?"hide":"show"].join(" ")} onClick={()=>validate()}>
//                     <span className="v5-logo-icon">
//                         <span className="v5-logo-small"></span>
//                     </span>
//                     <span className="v5-text-normal">点击按钮进行验证</span>
//                 </div>
//                 <div className={["v5-btn-custom","v5-validation-btn-ing",btnStatus != 'ing'?"hide":"show"].join(" ")}>
//                     <span className="v5-logo-icon">
//                         <span className="v5-logo-small"></span>
//                         <span className="v5-ball-scale-multiple">
//                             <i></i><i></i><i></i>
//                         </span>
//                     </span>
//                     <span className="v5-text-ing">智能检测中...</span>
//                 </div>
//                 <div className={["v5-btn-custom", "v5-validation-btn-success",btnStatus != 'success'?"hide":"show"].join(" ")}><div className="v5-flash"></div>
//                     <div className="v5-icon-success">
//                         <div className="v5-ball-clip-rotate"><div></div></div>
//                         <span className="v5-icon-ok"></span>
//                         <span className="v5-ok-move"></span>
//                     </div>
//                     <span className="v5-success-text">验证通过</span>
//                 </div>
//                 <div className={["v5-btn-custom", "v5-validation-btn-fail",btnStatus != 'fail'?"hide":"show"].join(" ")}>
//                     <div className="v5-flash"></div>
//                     <div className="v5-icon-fail">
//                         <div className="v5-ball-clip-rotate"><div></div></div>
//                         <span className="v5-icon-error"></span>
//                         <span className="v5-ok-move"></span>
//                     </div>
//                     <span className="v5-fail-text">验证失败</span>
//                 </div>
//                 <button className="modal-button" onClick={()=>login()}>登录</button>
//             </div>
//             <LoadingOutlined className="modal-loading"/>
//         </div>
//     )
// }

// //背景云模块
// function LoginBackground(){
//     useEffect(()=>{
//         var container;
//         var camera, scene, renderer;
//         var mesh, geometry, material;

//         var mouseX = 0, mouseY = 0;
//         var start_time = Date.now();

//         var windowHalfX = window.innerWidth / 2;
//         var windowHalfY = window.innerHeight / 2;

//         init();

//         function init() {
//             container = document.createElement( 'div' );
//             var cloudBackground = document.getElementById("cloudBackground");
//             cloudBackground.style.height = window.innerHeight+'px';
//             cloudBackground.appendChild( container );
//             var canvas = document.createElement( 'canvas' );
//             canvas.width = 32;
//             canvas.height = window.innerHeight;
//             var context = canvas.getContext( '2d' );
//             var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
//             gradient.addColorStop(0, "#1e4877");
//             gradient.addColorStop(0.5, "#4584b4");
//             context.fillStyle = gradient;
//             context.fillRect(0, 0, canvas.width, canvas.height);
//             container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
//             container.style.backgroundSize = '32px 100%';
//             camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
//             camera.position.z = 6000;
//             scene = new THREE.Scene();
//             geometry = new THREE.Geometry();
//             var texture = THREE.ImageUtils.loadTexture( cloudPng, null, animate );
//             texture.magFilter = THREE.LinearMipMapLinearFilter;
//             texture.minFilter = THREE.LinearMipMapLinearFilter;
//             var fog = new THREE.Fog( 0x4584b4, - 100, 3000 );
//             material = new THREE.ShaderMaterial( {
//                 uniforms: {
//                     "map": { type: "t", value: texture },
//                     "fogColor" : { type: "c", value: fog.color },
//                     "fogNear" : { type: "f", value: fog.near },
//                     "fogFar" : { type: "f", value: fog.far },
//                 },
//                 vertexShader: document.getElementById( 'vs' ).textContent,
//                 fragmentShader: document.getElementById( 'fs' ).textContent,
//                 depthWrite: false,
//                 depthTest: false,
//                 transparent: true
//             } );
//             var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );
//             for ( var i = 0; i < 8000; i++ ) {
//                 plane.position.x = Math.random() * 1000 - 500;
//                 plane.position.y = - Math.random() * Math.random() * 200 - 15;
//                 plane.position.z = i;
//                 plane.rotation.z = Math.random() * Math.PI;
//                 plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
//                 geometry.mergeMesh( plane );
//             }
//             mesh = new THREE.Mesh( geometry, material );
//             scene.add( mesh );
//             mesh = new THREE.Mesh( geometry, material );
//             mesh.position.z = - 8000;
//             scene.add( mesh );
//             renderer = new THREE.WebGLRenderer( { antialias: false ,alpha:true} );
//             renderer.setSize( window.innerWidth, window.innerHeight );
//             container.appendChild( renderer.domElement );
//             document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//             window.addEventListener( 'resize', onWindowResize, false );
//         }
//         function onDocumentMouseMove( event ) {
//             mouseX = ( event.clientX - windowHalfX ) * 0.25;
//             mouseY = ( event.clientY - windowHalfY ) * 0.15;
//         }
//         function onWindowResize( event ) {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize( window.innerWidth, window.innerHeight );
//         }
//         function animate() {
//             requestAnimationFrame( animate );
//             var position = ( ( Date.now() - start_time ) * 0.03 ) % 8000;
//             camera.position.x += ( mouseX - camera.position.x ) * 0.01;
//             camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
//             camera.position.z = - position + 8000;
//             renderer.render( scene, camera );
//         }
//     },[])
//     return(
//         <div id="cloudBackground" className="login-modal-background"></div>
//     )
// }
// export default Login