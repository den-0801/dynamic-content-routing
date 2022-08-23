"use strict";(self.webpackChunkexample=self.webpackChunkexample||[]).push([[179],{889:()=>{function t(t,n,i,e){return new(i||(i=Promise))((function(o,s){function r(t){try{l(e.next(t))}catch(t){s(t)}}function a(t){try{l(e.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(r,a)}l((e=e.apply(t,n||[])).next())}))}function n(t,n,i,e){if("a"===i&&!e)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof n?t!==n||!e:!n.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?e:"a"===i?e.call(t):e?e.value:n.get(t)}function i(t,n,i,e,o){if("m"===e)throw new TypeError("Private method is not writable");if("a"===e&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof n?t!==n||!o:!n.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===e?o.call(t,i):o?o.value=i:n.set(t,i),i}function e({timing:t,draw:n,duration:i}){return new Promise(((e,o)=>{try{const o=performance.now();requestAnimationFrame((function s(r){let a=(r-o)/i;a>1&&(a=1);const l=t(a);n(l),a<1?requestAnimationFrame(s):e()}))}catch(t){o(new Error(t))}}))}function o({timing:t,draw:n,duration:i,delay:o}){return o?(s=o,new Promise((t=>{setTimeout(t,s)}))).then((()=>e({timing:t,draw:n,duration:i}))):e({timing:t,draw:n,duration:i});var s}var s;class r{constructor(){s.set(this,void 0),i(this,s,{},"f")}getSubscribers(t){return n(this,s,"f")[t]}emit(t,i){n(this,s,"f")[t]&&n(this,s,"f")[t].forEach((t=>{t(i)}))}on(t,i){n(this,s,"f")[t]||(n(this,s,"f")[t]=[]),n(this,s,"f")[t].push(i)}off(t,e){if(t)if(e||void 0===n(this,s,"f")[t]){if(void 0!==n(this,s,"f")[t]&&e instanceof Function){const i=n(this,s,"f")[t].indexOf(e);i>-1&&n(this,s,"f")[t].splice(i,1)}}else n(this,s,"f")[t]=[];else i(this,s,{},"f")}}function a(n){var i,e,s,r;return t(this,void 0,void 0,(function*(){const t=[];for(let a=0;a<n.elsList.length;a++){const l=n.elsList[a],c=null===(i=n.delay)||void 0===i?void 0:i.min,u=null===(e=n.delay)||void 0===e?void 0:e.max,d=Math.random()*(u-c)+c,h=null===(s=n.duration)||void 0===s?void 0:s.min,m=null===(r=n.duration)||void 0===r?void 0:r.max,v=Math.random()*(m-h)+h,f=n.draw,p=n.timing;t.push(o({draw:t=>f(l,t),duration:v,delay:d,timing:p}))}return Promise.all(t)}))}function l(n){return t(this,void 0,void 0,(function*(){const t=null==n?void 0:n.duration,i=null==n?void 0:n.delay,e=null==n?void 0:n.draw;return o({draw:t=>e(n.el,t),duration:t,delay:i,timing:null==n?void 0:n.timing})}))}function c(t,n){t.classList.add(n.class),null!=n.duration&&t.style.setProperty("animation-duration",`${n.duration}ms`),null!=n.delay&&t.style.setProperty("animation-delay",`${n.delay}ms`)}function u(t,n){t.classList.remove(n),t.style.setProperty("animation-duration",null),t.style.setProperty("animation-delay",null)}function d(n){return t(this,void 0,void 0,(function*(){return new Promise((t=>{n.addEventListener("animationend",(n=>{n.stopPropagation(),t()}),{once:!0})}))}))}function h(n){return t(this,void 0,void 0,(function*(){return c(n.el,n),d(n.el).then((()=>Promise.resolve()))}))}function m(n){var i,e,o,s;return t(this,void 0,void 0,(function*(){const t=[];for(let r=0;r<n.elsList.length;r++){const a=n.elsList[r],l=null===(i=n.duration)||void 0===i?void 0:i.min,u=null===(e=n.duration)||void 0===e?void 0:e.max,h=Math.random()*(u-l)+l,m=null===(o=n.delay)||void 0===o?void 0:o.min,v=null===(s=n.delay)||void 0===s?void 0:s.max;c(a,{duration:h,delay:Math.random()*(v-m)+m,class:n.class}),t.push(d(a))}return Promise.all(t)}))}s=new WeakMap;const v=function(t,n){t.style.setProperty("opacity",`${n}`)},f=function(t){return t};class p extends Error{constructor(t){super(t),this.name=this.constructor.name}}function y(t,n){const i=Object.assign({},t);return null==i.delay&&(i.delay=500),null==i.duration&&(i.duration=200),null==i.draw&&(i.draw=v),null==i.timing&&(i.timing=f),i}function w(t,n){const i=Object.assign({},t);return null==i.delay&&(i.delay=500),null==i.duration&&(i.duration=200),null==i.class&&n&&(i.class="dr-main-content-animation-in"),null!=i.class||n||(i.class="dr-main-content-animation-out"),i}function g(t,n){const i=Object.assign({},t);return null==i.delay&&(i.delay={min:50,max:500}),null==i.duration&&(i.duration={min:200,max:500}),null==i.draw&&(i.draw=v),null==i.timing&&(i.timing=f),i}function P(t,n){const i=Object.assign({},t);return null==i.delay&&(i.delay={min:50,max:500}),null==i.duration&&(i.duration={min:200,max:500}),null==i.class&&n&&(i.class="dr-parts-content-animation-in"),null!=i.class||n||(i.class="dr-parts-content-animation-out"),i}function x(t,n,i){return"css"===i?w(t,n):y(t)}function k(t,n,i){return"css"===i?P(t,n):g(t)}function E({content:n,parts:i,reverseOrder:e,type:o}){return t(this,void 0,void 0,(function*(){const s="css"===o?function({content:n,parts:i,reverseOrder:e}){return t(this,void 0,void 0,(function*(){const t=w(n,e),o=i?P(i,e):null;return new Promise(((i,s)=>{var r,a;if(e){if(o){const t=(null!==(r=n.delay)&&void 0!==r?r:0)+(null!==(a=n.duration)&&void 0!==a?a:0);o.delay.max=o.delay.max+t,o.delay.min=o.delay.min+t}const e=[h(t)];o&&e.push(m(o)),Promise.all(e).then((()=>{i()})).catch((t=>{s(t)}))}else(o?m(o):Promise.resolve(null)).then((()=>h(t))).then((()=>{i()})).catch((t=>{s(t)}))}))}))}({content:n,parts:i,reverseOrder:e}):function({content:n,parts:i,reverseOrder:e}){return t(this,void 0,void 0,(function*(){const t=y(n),o=i?g(i):null;return new Promise(((n,i)=>{e?l(t).then((()=>o?a(o):Promise.resolve(null))).then((()=>{n()})).catch((t=>{i(t)})):(o?a(o):Promise.resolve(null)).then((()=>l(t))).then((()=>{n()})).catch((t=>{i(t)}))}))}))}({content:n,parts:i,reverseOrder:e});return new Promise(((t,n)=>{s.then((()=>{t()})).catch((t=>{var i;const e=new p(null!==(i=null==t?void 0:t.message)&&void 0!==i?i:t);n(e)}))}))}))}const O=".action-link";class b extends Error{constructor(t){super("Href not found"),this.name=this.constructor.name,this.element=t}}var T,j,M,L,S,I,W,$,A,C,q,H,F,B,D,N,Y,R,z,G,J,K,Q,U,V,X,Z,_,tt;class nt extends r{constructor(t){super(),T.add(this),j.set(this,void 0),M.set(this,void 0),L.set(this,void 0),this.linkSelector=(null==t?void 0:t.linkSelector)||O,i(this,M,n(this,T,"m",C).bind(this),"f"),i(this,L,n(this,T,"m",$).bind(this),"f"),i(this,j,window.location.href,"f")}run(){n(this,T,"m",S).call(this)}destroy(){n(this,T,"m",I).call(this)}goBack(){n(this,j,"f")&&history.pushState({},"",n(this,j,"f"))}}j=new WeakMap,M=new WeakMap,L=new WeakMap,T=new WeakSet,S=function(){document.addEventListener("click",n(this,M,"f")),window.addEventListener("popstate",n(this,L,"f"))},I=function(){document.removeEventListener("click",n(this,M,"f")),window.removeEventListener("popstate",n(this,L,"f"))},W=function(t){return!!this.linkSelector&&t.matches(this.linkSelector)},$=function(t){n(this,T,"m",A).call(this,{type:"popstate",href:window.location.href})},A=function(t){i(this,j,t.href,"f"),this.emit("action",t)},C=function(t){const i=t.target;if(!n(this,T,"m",W).call(this,i))return!1;t.preventDefault();const e=i.getAttribute("href");if(!e){const t=new b(i);return this.emit("error",t),!1}return history.pushState({},"",e),n(this,T,"m",A).call(this,{type:"link-click",nativeEvent:t,target:i,href:e}),!0};class it extends Error{constructor(t){super(null==t?"Network error":t),this.name=this.constructor.name}}class et extends it{constructor(){super("No internet connection"),this.name=this.constructor.name}}class ot extends Error{constructor(){super("Request was aborted"),this.name=this.constructor.name}}class st extends Error{constructor(t){super(),this.name=this.constructor.name,t&&(this.response=t)}}class rt extends Error{constructor(t,n){super(t),this.name=this.constructor.name,this.response=n}}class at extends Error{constructor(t){super("Content not found"),this.name=this.constructor.name,this.selector=t}}class lt extends r{constructor(t){super(),q.set(this,void 0),this.selector=t.selector}stop(){n(this,q,"f")&&n(this,q,"f").abort()}load(e){return t(this,void 0,void 0,(function*(){try{i(this,q,new AbortController,"f");const t=yield fetch(e,{signal:n(this,q,"f").signal});if(!t.ok){const n=new st(t);return Promise.reject(n)}try{const n=yield t.text(),i=document.createElement("div");i.innerHTML=n;const e=i.querySelector(`${this.selector}`);if(!(e instanceof HTMLElement)){const t=new at(this.selector);return Promise.reject(t)}const o={contentElement:e};return Promise.resolve(o)}catch(n){const i=new rt(`${null==n?void 0:n.message}`,t);return Promise.reject(i)}}catch(t){if(!navigator.onLine){const t=new et;return Promise.reject(t)}if("AbortError"===t.name){const t=new ot;return Promise.reject(t)}const n=new it;return Promise.reject(n)}}))}}q=new WeakMap;class ct extends Error{constructor(t){super("Content element not found"),this.name=this.constructor.name,this.selector=t}}class ut extends r{constructor(t){var e;super(),H.add(this),F.set(this,void 0),B.set(this,[]),D.set(this,void 0),N.set(this,void 0),Y.set(this,void 0),n(this,H,"m",R).call(this,t),i(this,D,new nt({linkSelector:this.linkSelector}),"f"),i(this,N,new lt({selector:null===(e=this.content)||void 0===e?void 0:e.selector}),"f")}run(){n(this,D,"f").run(),n(this,D,"f").on("action",n(this,H,"m",tt).bind(this)),n(this,D,"f").on("error",n(this,H,"m",_).bind(this))}destroy(){n(this,D,"f").off(),n(this,D,"f").destroy(),n(this,N,"f").off()}getAnimationProps(t){var i,e,o,s,r,a,l,c,u,d,h,m,v,f,p,y,w,g,P,x;const k="in"===t?"animationIn":"animationOut",E={type:this.animationType,reverseOrder:"in"===t,content:{el:n(this,F,"f"),duration:null===(e=null===(i=this.content)||void 0===i?void 0:i[k])||void 0===e?void 0:e.duration,delay:null===(s=null===(o=this.content)||void 0===o?void 0:o[k])||void 0===s?void 0:s.delay},parts:{elsList:n(this,B,"f"),duration:null===(a=null===(r=this.parts)||void 0===r?void 0:r[k])||void 0===a?void 0:a.duration,delay:null===(c=null===(l=this.parts)||void 0===l?void 0:l[k])||void 0===c?void 0:c.delay}};return"css"===this.animationType?(E.content.class=null===(d=null===(u=this.content)||void 0===u?void 0:u[k])||void 0===d?void 0:d.class,E.parts.class=null===(m=null===(h=this.parts)||void 0===h?void 0:h[k])||void 0===m?void 0:m.class):(E.content.draw=null===(f=null===(v=this.content)||void 0===v?void 0:v[k])||void 0===f?void 0:f.draw,E.content.timing=null===(y=null===(p=this.content)||void 0===p?void 0:p[k])||void 0===y?void 0:y.timing,E.parts.draw=null===(g=null===(w=this.parts)||void 0===w?void 0:w[k])||void 0===g?void 0:g.draw,E.parts.timing=null===(x=null===(P=this.parts)||void 0===P?void 0:P[k])||void 0===x?void 0:x.timing),E}}function dt(t){return t}function ht(t){return t<.5?4*Math.pow(t,3):4*Math.pow(t-1,3)+1}function mt(t,n){t.style.setProperty("opacity",`${n}`)}function vt(t,n){t.style.setProperty("opacity",""+(1-n))}F=new WeakMap,B=new WeakMap,D=new WeakMap,N=new WeakMap,Y=new WeakMap,H=new WeakSet,R=function(t){var n,i,e,o,s,r,a,l,c,u,d,h;this.linkSelector=(null==t?void 0:t.linkSelector)||O,this.animationType=(null==t?void 0:t.animationType)||"css",this.content={selector:null!==(i=null===(n=null==t?void 0:t.content)||void 0===n?void 0:n.selector)&&void 0!==i?i:"#dr-loading-main-content",animationIn:null!==(o=null===(e=null==t?void 0:t.content)||void 0===e?void 0:e.animationIn)&&void 0!==o?o:{},animationOut:null!==(r=null===(s=null==t?void 0:t.content)||void 0===s?void 0:s.animationOut)&&void 0!==r?r:{}},this.parts={selector:null!==(l=null===(a=null==t?void 0:t.parts)||void 0===a?void 0:a.selector)&&void 0!==l?l:".dr-loading-part",animationIn:null!==(u=null===(c=null==t?void 0:t.parts)||void 0===c?void 0:c.animationIn)&&void 0!==u?u:{},animationOut:null!==(h=null===(d=null==t?void 0:t.parts)||void 0===d?void 0:d.animationOut)&&void 0!==h?h:{}},this.content.animationIn=x(this.content.animationIn,!0,this.animationType),this.content.animationOut=x(this.content.animationOut,!1,this.animationType),this.parts.animationIn=k(this.parts.animationIn,!0,this.animationType),this.parts.animationOut=k(this.parts.animationOut,!1,this.animationType)},z=function(){this.content&&i(this,F,document.querySelector(`${this.content.selector}`),"f")},G=function(){this.parts?i(this,B,[...document.querySelectorAll(`${this.parts.selector}`)],"f"):i(this,B,[],"f")},J=function(){var t;if(n(this,H,"m",z).call(this),!n(this,F,"f")){throw new ct(null===(t=this.content)||void 0===t?void 0:t.selector)}n(this,H,"m",G).call(this)},K=function(i){return t(this,void 0,void 0,(function*(){const t=[];t.push(n(this,H,"m",Q).call(this,i)),t.push(n(this,H,"m",X).call(this)),this.emit("start");const e=yield Promise.allSettled(t);return"rejected"===e[0].status?Promise.reject(e[0].reason):"rejected"===e[1].status?Promise.reject(e[1].reason):Promise.resolve(e[0].value)}))},Q=function(i){return t(this,void 0,void 0,(function*(){return n(this,Y,"f")&&n(this,N,"f").stop(),n(this,N,"f").load(i.href)}))},U=function(t){if("css"===this.animationType){const i="in"===t?"animationIn":"animationOut";u(n(this,F,"f"),this.content[i].class),n(this,B,"f").forEach((t=>{u(t,this.parts[i].class)}))}},V=function(){return t(this,void 0,void 0,(function*(){return E(this.getAnimationProps("in")).catch((t=>Promise.reject(Object.assign({type:"animation-in"},t))))}))},X=function(){return t(this,void 0,void 0,(function*(){return E(this.getAnimationProps("out")).catch((t=>Promise.reject(Object.assign({type:"animation-out"},t))))}))},Z=function(t){n(this,F,"f").outerHTML=t},_=function(t){n(this,Y,"f")||(this.emit("error",t),i(this,Y,!1,"f"))},tt=function(e){var o,s,r,a,l;return t(this,void 0,void 0,(function*(){if(n(this,Y,"f"))return Promise.resolve();n(this,H,"m",J).call(this),i(this,Y,!0,"f");try{const t=yield n(this,H,"m",K).call(this,e);n(this,H,"m",Z).call(this,null===(o=t.contentElement)||void 0===o?void 0:o.outerHTML),n(this,H,"m",J).call(this),"js"===this.animationType&&(n(this,B,"f").forEach((t=>{var n,i,e;return null===(e=null===(i=null===(n=this.parts)||void 0===n?void 0:n.animationIn)||void 0===i?void 0:i.draw)||void 0===e?void 0:e.call(i,t,0)})),null===(a=null===(r=null===(s=this.content)||void 0===s?void 0:s.animationIn)||void 0===r?void 0:r.draw)||void 0===a||a.call(r,n(this,F,"f"),0)),yield n(this,H,"m",V).call(this),n(this,H,"m",U).call(this,"in"),i(this,Y,!1,"f"),this.emit("complete")}catch(t){t instanceof ot||(n(this,H,"m",U).call(this,"out"),n(this,H,"m",Z).call(this,null===(l=n(this,F,"f"))||void 0===l?void 0:l.outerHTML),n(this,H,"m",J).call(this),yield n(this,H,"m",V).call(this),n(this,H,"m",U).call(this,"in"),n(this,D,"f").goBack(),this.emit("error",t),i(this,Y,!1,"f"))}}))},window.addEventListener("DOMContentLoaded",(()=>{new ut({linkSelector:".action-link",animationType:"css",content:{selector:"#dr-loading-main-content",animationOut:{class:"dr-main-content-animation-out",delay:0},animationIn:{class:"dr-main-content-animation-in",delay:0}},parts:{selector:".dr-loading-part",animationOut:{class:"dr-parts-content-animation-out",duration:{min:50,max:500},delay:{min:50,max:500}},animationIn:{class:"dr-parts-content-animation-in",duration:{min:50,max:500},delay:{min:50,max:500}}}});const t=new ut({linkSelector:".action-link",animationType:"js",content:{selector:"#dr-loading-main-content",animationOut:{timing:dt,draw:vt,duration:500,delay:0},animationIn:{timing:dt,draw:mt,duration:500,delay:0}},parts:{selector:".dr-loading-part",animationOut:{timing:ht,draw:(t,n)=>function(t,n,i){t.style.setProperty("transform",`translateY(${n*i}px)`),t.style.setProperty("opacity",""+(1-n))}(t,n,70),duration:{min:50,max:500},delay:{min:50,max:500}},animationIn:{timing:ht,draw:(t,n)=>function(t,n,i){t.style.setProperty("transform",`translateY(${(1-n)*i}px)`),t.style.setProperty("opacity",`${n}`)}(t,n,70),duration:{min:50,max:500},delay:{min:50,max:500}}}});t.run(),t.on("error",(t=>{}))}))}},t=>{var n;n=889,t(t.s=n)}]);