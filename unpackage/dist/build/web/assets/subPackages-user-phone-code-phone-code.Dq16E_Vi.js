import{h as e,r as a,c as s,w as t,i as l,o,a as r,d as u,t as n,N as d,D as i,I as c,E as f}from"./index-CXRbaKsi.js";import{_ as p}from"./uni-nav-bar.pIin5XDL.js";import{_ as m,o as b,c as v,r as _}from"./uni-app.es.4GHwWxH-.js";import{t as x}from"./tokenNavigateTo.DmpTWe7d.js";import"./uni-icons.CASMTA-H.js";const h=m({__name:"phone-code",setup(m){const h=e();e();const k=e(60),g=e(!1);b((e=>{h.value=e.phoneNumber})),v((()=>{I()}));const j=()=>{d()},y=()=>{x("/subPackages/user/set-user/set-user")},C=()=>{I()},I=()=>{g.value=!0;let e=setInterval((()=>{k.value--}),1e3);setTimeout((()=>{clearInterval(e),k.value=60,g.value=!1}),6e4)};return(e,d)=>{const m=_(a("uni-nav-bar"),p),b=i,v=c,x=f,h=l;return o(),s(h,{class:"phone-register"},{default:t((()=>[r(m,{dark:"",fixed:!0,shadow:"","background-color":"#c5b6a0","status-bar":"","left-icon":"left","left-text":"返回",title:"输入验证码",onClickLeft:j}),r(h,{class:"content"},{default:t((()=>[r(b,{class:"text"},{default:t((()=>[u("验证码：")])),_:1}),r(v,{style:{flex:"1"},type:"number",modelValue:e.code,"onUpdate:modelValue":d[0]||(d[0]=a=>e.code=a),placeholder:"请输入验证码",focus:"true"},null,8,["modelValue"]),r(x,{onClick:C,style:{flex:"0.6"},type:"default",size:"mini",plain:"true",disabled:g.value},{default:t((()=>[u("重新发送"+n(k.value),1)])),_:1},8,["disabled"])])),_:1}),r(h,{class:"remind"},{default:t((()=>[u(" 功能暂未实现请直接下一步 ")])),_:1}),r(x,{class:"btn",onClick:y,style:{backgroundColor:"#7f6147",color:"white","border-radius":"40rpx",margin:"50rpx"}},{default:t((()=>[u("下一步")])),_:1})])),_:1})}}},[["__scopeId","data-v-b27ea7b1"]]);export{h as default};
