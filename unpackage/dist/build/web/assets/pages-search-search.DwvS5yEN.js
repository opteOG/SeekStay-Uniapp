import{r as t,o as e,c as a,w as s,a as i,b as n,d as o,v as r,I as l,i as c,e as u,f as h,n as m,g as d,h as f,j as p,F as y,k as g,u as v,l as _,t as b,m as w,S as k,p as $,q as x,s as S,x as C,y as T,z as j}from"./index-CXRbaKsi.js";import{_ as H}from"./uni-nav-bar.pIin5XDL.js";import{_ as A,r as B,o as I,a as L}from"./uni-app.es.4GHwWxH-.js";import{_ as X}from"./uni-icons.CASMTA-H.js";import{t as Y}from"./tokenNavigateTo.DmpTWe7d.js";import{u as F}from"./dataStore.L1fbEAHP.js";import{_ as N}from"./RoomResource.DIr8bHsM.js";import"./index.TDGrnhG4.js";import"./uni-rate.TWM__6Fq.js";const P=A({name:"SearchBar",data:()=>({content:"",showPH:!0}),methods:{handleSearch(){Y(`/subPackages/search/search-answer/search-answer?content=${this.content}`,!0)},handleFocus(){this.showPH=!1},handleBlur(){this.showPH=!0,this.content=""}}},[["render",function(u,h,m,d,f,p){const y=l,g=B(t("uni-icons"),X),v=c;return e(),a(v,{class:"searchBar"},{default:s((()=>[i(y,{class:"search",modelValue:f.content,"onUpdate:modelValue":h[0]||(h[0]=t=>f.content=t),type:"text","auto-blur":"true",onFocus:p.handleFocus,onBlur:p.handleBlur,onConfirm:p.handleSearch},null,8,["modelValue","onFocus","onBlur","onConfirm"]),n(i(v,{class:"placeHolder"},{default:s((()=>[i(g,{type:"search"}),o(" 开始搜索 ")])),_:1},512),[[r,f.showPH]])])),_:1})}],["__scopeId","data-v-df6cfc30"]]);class R{constructor(t,e){this.options=t,this.animation=u({...t}),this.currentStepAnimates={},this.next=0,this.$=e}_nvuePushAnimates(t,e){let a=this.currentStepAnimates[this.next],s={};if(s=a||{styles:{},config:{}},z.includes(t)){s.styles.transform||(s.styles.transform="");let a="";"rotate"===t&&(a="deg"),s.styles.transform+=`${t}(${e+a}) `}else s.styles[t]=`${e}`;this.currentStepAnimates[this.next]=s}_animateRun(t={},e={}){let a=this.$.$refs.ani.ref;if(a)return new Promise(((s,i)=>{nvueAnimation.transition(a,{styles:t,...e},(t=>{s()}))}))}_nvueNextAnimate(t,e=0,a){let s=t[e];if(s){let{styles:i,config:n}=s;this._animateRun(i,n).then((()=>{e+=1,this._nvueNextAnimate(t,e,a)}))}else this.currentStepAnimates={},"function"==typeof a&&a(),this.isEnd=!0}step(t={}){return this.animation.step(t),this}run(t){this.$.animationData=this.animation.export(),this.$.timer=setTimeout((()=>{"function"==typeof t&&t()}),this.$.durationTime)}}const z=["matrix","matrix3d","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"];function D(t,e){if(e)return clearTimeout(e.timer),new R(t,e)}z.concat(["opacity","backgroundColor"],["width","height","left","right","top","bottom"]).forEach((t=>{R.prototype[t]=function(...e){return this.animation[t](...e),this}}));const O=A({name:"uniTransition",emits:["click","change"],props:{show:{type:Boolean,default:!1},modeClass:{type:[Array,String],default:()=>"fade"},duration:{type:Number,default:300},styles:{type:Object,default:()=>({})},customClass:{type:String,default:""},onceRender:{type:Boolean,default:!1}},data:()=>({isShow:!1,transform:"",opacity:1,animationData:{},durationTime:300,config:{}}),watch:{show:{handler(t){t?this.open():this.isShow&&this.close()},immediate:!0}},computed:{stylesObject(){let t={...this.styles,"transition-duration":this.duration/1e3+"s"},e="";for(let a in t){e+=this.toLine(a)+":"+t[a]+";"}return e},transformStyles(){return"transform:"+this.transform+";opacity:"+this.opacity+";"+this.stylesObject}},created(){this.config={duration:this.duration,timingFunction:"ease",transformOrigin:"50% 50%",delay:0},this.durationTime=this.duration},methods:{init(t={}){t.duration&&(this.durationTime=t.duration),this.animation=D(Object.assign(this.config,t),this)},onClick(){this.$emit("click",{detail:this.isShow})},step(t,e={}){if(this.animation){for(let e in t)try{"object"==typeof t[e]?this.animation[e](...t[e]):this.animation[e](t[e])}catch(a){console.error(`方法 ${e} 不存在`)}return this.animation.step(e),this}},run(t){this.animation&&this.animation.run(t)},open(){clearTimeout(this.timer),this.transform="",this.isShow=!0;let{opacity:t,transform:e}=this.styleInit(!1);void 0!==t&&(this.opacity=t),this.transform=e,this.$nextTick((()=>{this.timer=setTimeout((()=>{this.animation=D(this.config,this),this.tranfromInit(!1).step(),this.animation.run(),this.$emit("change",{detail:this.isShow})}),20)}))},close(t){this.animation&&this.tranfromInit(!0).step().run((()=>{this.isShow=!1,this.animationData=null,this.animation=null;let{opacity:t,transform:e}=this.styleInit(!1);this.opacity=t||1,this.transform=e,this.$emit("change",{detail:this.isShow})}))},styleInit(t){let e={transform:""},a=(t,a)=>{"fade"===a?e.opacity=this.animationType(t)[a]:e.transform+=this.animationType(t)[a]+" "};return"string"==typeof this.modeClass?a(t,this.modeClass):this.modeClass.forEach((e=>{a(t,e)})),e},tranfromInit(t){let e=(t,e)=>{let a=null;"fade"===e?a=t?0:1:(a=t?"-100%":"0","zoom-in"===e&&(a=t?.8:1),"zoom-out"===e&&(a=t?1.2:1),"slide-right"===e&&(a=t?"100%":"0"),"slide-bottom"===e&&(a=t?"100%":"0")),this.animation[this.animationMode()[e]](a)};return"string"==typeof this.modeClass?e(t,this.modeClass):this.modeClass.forEach((a=>{e(t,a)})),this.animation},animationType:t=>({fade:t?0:1,"slide-top":`translateY(${t?"0":"-100%"})`,"slide-right":`translateX(${t?"0":"100%"})`,"slide-bottom":`translateY(${t?"0":"100%"})`,"slide-left":`translateX(${t?"0":"-100%"})`,"zoom-in":`scaleX(${t?1:.8}) scaleY(${t?1:.8})`,"zoom-out":`scaleX(${t?1:1.2}) scaleY(${t?1:1.2})`}),animationMode:()=>({fade:"opacity","slide-top":"translateY","slide-right":"translateX","slide-bottom":"translateY","slide-left":"translateX","zoom-in":"scale","zoom-out":"scale"}),toLine:t=>t.replace(/([A-Z])/g,"-$1").toLowerCase()}},[["render",function(t,i,o,l,u,f){const p=c;return n((e(),a(p,{ref:"ani",animation:u.animationData,class:m(o.customClass),style:d(f.transformStyles),onClick:f.onClick},{default:s((()=>[h(t.$slots,"default")])),_:3},8,["animation","class","style","onClick"])),[[r,u.isShow]])}]]),V=A({__name:"TagBar",setup(t){const n=f(1),o=F();f();return(t,r)=>{const l=w,u=c,h=k;return e(),a(h,{"scroll-x":"true","show-scrollbar":"false"},{default:s((()=>[i(u,{class:"tag-bar"},{default:s((()=>[(e(!0),p(y,null,g(v(o).tagList,(t=>(e(),a(u,{key:t.id,class:m(n.value===t.id?"item active":"item"),onClick:e=>((t=1)=>{o.fetchDataList(t),n.value=t})(t.id)},{default:s((()=>[i(l,{class:"icon",src:t.icon,mode:"aspectFit"},null,8,["src"]),_("span",{class:"name"},b(t.name),1)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1})}}},[["__scopeId","data-v-d5b1fb0b"]]),q=A({__name:"VirtualList",props:{list:{type:Array,require:!0},itemHeight:{type:Number,require:!0},contentHeight:{type:Number,require:!0}},setup(t){const n=t,{list:o,itemHeight:r,contentHeight:l}=$(n),u=f(0),m=x((()=>o.value.length*r.value)),_=x((()=>Math.ceil(l.value/r.value))),b=x((()=>Math.floor(u.value/r.value))),w=x((()=>b.value+_.value)),S=x((()=>o.value.slice(b.value,w.value))),C=t=>{u.value=t.detail.scrollTop},T=t=>t*r.value;return(t,n)=>{const o=c,r=k;return e(),a(r,{class:"list-wrap","scroll-y":"true",onScroll:C,style:d({height:2*v(l)+"rpx"})},{default:s((()=>[i(o,{class:"virtual-list",style:d({height:2*m.value+"rpx"})},{default:s((()=>[(e(!0),p(y,null,g(S.value,((i,n)=>(e(),a(o,{class:"virtual-list-item",style:d({top:2*T(b.value+n)+"rpx"}),key:b.value+n},{default:s((()=>[h(t.$slots,"default",{item:i,key:n},void 0,!0)])),_:2},1032,["style"])))),128))])),_:3},8,["style"])])),_:3},8,["style"])}}},[["__scopeId","data-v-95045706"]]),E=A({__name:"search",setup(n){const o=f(),r=f(!0),l=F();l.fetchDataList(1),l.fetchTagList();const u=S(),h=x((()=>u.windowHeight-150));I((async()=>{C(),setTimeout((()=>{T()}),1e3)})),L((()=>{setTimeout((()=>{T()}),1e3)})),o.value="search",r.value=!1;const m=()=>{r.value=!r.value};return(n,u)=>{const d=w,f=B(t("uni-nav-bar"),H),_=c,b=B(t("SearchBar"),P),k=B(t("uni-transition"),O),$=B(t("TagBar"),V),x=B(t("RoomResource"),N),S=B(t("VirtualList"),q);return e(),p(y,null,[i(_,{class:"custom-nav-bar"},{default:s((()=>[i(f,{backgroundColor:"#c5b6a0",border:!1,fixed:!0,"status-bar":"",title:"寻栖",color:"#625b50",style:{"font-weight":"600",height:"100rpx"},"right-icon":o.value,onClickRight:m},{left:s((()=>[i(d,{src:"https://img.picgo.net/2025/02/13/seekstayb3a7c86cda0409f8.png",mode:"aspectFit"})])),_:1},8,["right-icon"])])),_:1}),r.value?(e(),a(_,{key:0,class:"search-bar"},{default:s((()=>[i(k,{"mode-class":"slide-top",show:"true"},{default:s((()=>[i(b)])),_:1})])),_:1})):j("",!0),i(_,{class:"tag-bar"},{default:s((()=>[i($)])),_:1}),v(l).dataList.length?(e(),a(S,{key:2,list:v(l).dataList,itemHeight:420,contentHeight:h.value},{default:s((t=>[i(x,{data:t.item,onNavigate:e=>{return a=t.item.id,void Y(`/subPackages/order/room-detail/room-detail?id=${a}`,!0);var a}},null,8,["data","onNavigate"])])),_:1},8,["list","contentHeight"])):(e(),a(_,{key:1,style:{"padding-bottom":"100rpx"}},{default:s((()=>[(e(!0),p(y,null,g(Array.from({length:6}),((t,n)=>(e(),a(_,{key:n,class:"skeleton"},{default:s((()=>[i(_,{class:"image"}),i(_,{class:"context"},{default:s((()=>[i(_,{class:"context-item",style:{width:"600rpx"}}),i(_,{class:"context-item"}),i(_,{class:"context-item"})])),_:1})])),_:1})))),128))])),_:1}))],64)}}},[["__scopeId","data-v-88580dfc"]]);export{E as default};
