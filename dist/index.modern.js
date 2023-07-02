import t from"lodash.debounce";import e,{useRef as n,useState as r,useEffect as o}from"react";import{select as i,event as a}from"d3-selection";import s from"resize-observer-polyfill";import"d3-transition";import{range as l,min as c,max as f,descending as u}from"d3-array";import d from"d3-cloud";import h from"lodash.clonedeep";import m from"lodash.isempty";import y from"seedrandom";import p from"tippy.js";import{dispatch as x}from"d3-dispatch";import{scaleOrdinal as g,scaleLinear as v,scaleSqrt as b,scaleLog as w}from"d3-scale";import{schemeCategory10 as M}from"d3-scale-chromatic";function z(){return(z=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}const W=Math.PI/180;function k(t){return t.text}function S(){return"serif"}function O(){return"normal"}function T(t){return Math.sqrt(t.value)}function j(){return 30*(~~(6*Math.random())-3)}function $(){return 1}function q(t,e,n,r){if(e.sprite)return;const o=t.context,i=t.ratio;o.clearRect(0,0,2048/i,2048/i);let a=0,s=0,l=0,c=n.length;for(--r;++r<c;){e=n[r],o.save(),o.font=e.style+" "+e.weight+" "+~~((e.size+1)/i)+"px "+e.font;var f=o.measureText(e.text+"m").width*i,u=e.size<<1;if(e.rotate){const t=Math.sin(e.rotate*W),n=Math.cos(e.rotate*W),r=f*n,o=f*t,i=u*n,a=u*t;f=Math.max(Math.abs(r+a),Math.abs(r-a))+31>>5<<5,u=~~Math.max(Math.abs(o+i),Math.abs(o-i))}else f=f+31>>5<<5;if(u>l&&(l=u),a+f>=2048&&(a=0,s+=l,l=0),s+u>=2048)break;o.translate((a+(f>>1))/i,(s+(u>>1))/i),e.rotate&&o.rotate(e.rotate*W),o.fillText(e.text,0,0),e.padding&&(o.lineWidth=2*e.padding,o.strokeText(e.text,0,0)),o.restore(),e.width=f,e.height=u,e.xoff=a,e.yoff=s,e.x1=f>>1,e.y1=u>>1,e.x0=-e.x1,e.y0=-e.y1,e.hasText=!0,a+=f}const d=o.getImageData(0,0,2048/i,2048/i).data,h=[];for(;--r>=0;){if(!(e=n[r]).hasText)continue;for(var m=(f=e.width)>>5,y=(u=e.y1-e.y0,0);y<u*m;y++)h[y]=0;if(a=e.xoff,null==a)return;s=e.yoff;let t=0,o=-1;for(let n=0;n<u;n++){for(y=0;y<f;y++){const e=d[2048*(s+n)+(a+y)<<2]?1<<31-y%32:0;h[m*n+(y>>5)]|=e,t|=e}t?o=n:(e.y0++,u--,n--,s++)}e.y1=e.y0+o,e.sprite=h.slice(0,(e.y1-e.y0)*m)}}function A(t,e,n){let r,o=t.sprite,i=t.width>>5,a=t.x-(i<<4),s=127&a,l=32-s,c=t.y1-t.y0,f=(t.y+t.y0)*(n>>=5)+(a>>5);for(let t=0;t<c;t++){r=0;for(let n=0;n<=i;n++)if((r<<l|(n<i?(r=o[t*i+n])>>>s:0))&e[f+n])return!0;f+=n}return!1}function I(t,e){const n=t[0],r=t[1];e.x+e.x0<n.x&&(n.x=e.x+e.x0),e.y+e.y0<n.y&&(n.y=e.y+e.y0),e.x+e.x1>r.x&&(r.x=e.x+e.x1),e.y+e.y1>r.y&&(r.y=e.y+e.y1)}function E(t){const e=t[0]/t[1];return function(t){return[e*(t*=.1)*Math.cos(t),t*Math.sin(t)]}}function C(){return document.createElement("canvas")}function D(t){return"function"==typeof t?t:function(){return t}}var F={archimedean:E,rectangular:function(t){let e=4*t[0]/t[1],n=0,r=0;return function(t){const o=t<0?-1:1;switch(Math.sqrt(1+4*o*t)-o&3){case 0:n+=e;break;case 1:r+=4;break;case 2:n-=e;break;default:r-=4}return[n,r]}}};function R(t,e){return t[Math.floor(e()*t.length)]}function P(t){return t.size+"px"}function H(t){return t.text}function L(t){return`translate(${t.x}, ${t.y})`+("number"==typeof t.rotate?`rotate(${t.rotate})`:"")}function N({callbacks:t,maxWords:e,options:n,selection:r,size:o,words:i,activeWords:s}){const{deterministic:l,enableOptimizations:g,fontFamily:M,fontStyle:W,fontSizes:N,fontWeight:U,padding:V,randomSeed:B,rotations:G,rotationAngles:J,spiral:K,scale:Q}=n,X=i.concat().sort((t,e)=>u(t.value,e.value)).slice(0,e),Y=y(l?B||"deterministic":null);let Z;Z=g?function(){let t=[256,256],e=k,n=S,r=T,o=O,i=O,a=j,s=$,l=E,c=[],f=Infinity,u=x("word","end"),d=Math.random,h={},m=C,y=!1;function p(e,n,r){let o,i,a,s=n.x,c=n.y,f=Math.sqrt(t[0]*t[0]+t[1]*t[1]),u=l(t),h=d()<.5?1:-1,m=-h;for(;(o=u(m+=h))&&(i=~~o[0],a=~~o[1],!(Math.min(Math.abs(i),Math.abs(a))>=f));)if(n.x=s+i,n.y=c+a,!(n.x+n.x0<0||n.y+n.y0<0||n.x+n.x1>t[0]||n.y+n.y1>t[1]||r&&A(n,e,t[0])||r&&!((W=n).x+W.x1>(k=r)[0].x&&W.x+W.x0<k[1].x&&W.y+W.y1>k[0].y&&W.y+W.y0<k[1].y))){var y,p=n.sprite,x=n.width>>5,g=t[0]>>5,v=n.x-(x<<4),b=127&v,w=32-b,M=n.y1-n.y0,z=(n.y+n.y0)*g+(v>>5);for(let t=0;t<M;t++){y=0;for(let n=0;n<=x;n++)e[z+n]|=y<<w|(n<x?(y=p[t*x+n])>>>b:0);z+=g}return delete n.sprite,!0}var W,k;return!1}return h.canvas=function(t){return arguments.length?(m=D(t),h):m},h.start=function(){let l=function(t){t.width=t.height=1;const e=Math.sqrt(t.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,1,1).data.length>>2);t.width=2048/e,t.height=2048/e;const n=t.getContext("2d",{willReadFrequently:!0});return n.fillStyle=n.strokeStyle="red",n.textAlign="center",{context:n,ratio:e}}(m()),f=new Uint32Array((t[0]>>5)*t[1]),x=null,g=[],v=c.map(function(t,l){return t.text=e.call(this,t,l),t.font=n.call(this,t,l),t.style=o.call(this,t,l),t.weight=i.call(this,t,l),t.rotate=a.call(this,t,l),t.size=~~r.call(this,t,l),t.padding=s.call(this,t,l),t}).sort(function(t,e){return e.size-t.size});return setTimeout(()=>function e(n){const r=50*n,o=Math.min(50*(n+1),c.length);!function(e,n){for(let r=e;r<n;r+=1){const e=v[r];e.x=t[0]*(d()+.5)>>1,e.y=t[1]*(d()+.5)>>1,q(l,e,v,r),e.hasText&&p(f,e,x)&&(g.push(e),u.call("word",h,e),x?I(x,e):x=[{x:e.x+e.x0,y:e.y+e.y0},{x:e.x+e.x1,y:e.y+e.y1}],e.x-=t[0]>>1,e.y-=t[1]>>1)}}(r,o),y||(o<c.length?setTimeout(()=>e(n+1),0):(h.stop(),u.call("end",h,g,x)))}(0),0),h},h.revive=()=>(y=!1,h),h.stop=function(){return y=!0,h},h.timeInterval=function(t){return arguments.length?(f=null==t?Infinity:t,h):f},h.words=function(t){return arguments.length?(c=t,h):c},h.size=function(e){return arguments.length?(t=[+e[0],+e[1]],h):t},h.font=function(t){return arguments.length?(n=D(t),h):n},h.fontStyle=function(t){return arguments.length?(o=D(t),h):o},h.fontWeight=function(t){return arguments.length?(i=D(t),h):i},h.rotate=function(t){return arguments.length?(a=D(t),h):a},h.text=function(t){return arguments.length?(e=D(t),h):e},h.spiral=function(t){return arguments.length?(l=F[t]||t,h):l},h.fontSize=function(t){return arguments.length?(r=D(t),h):r},h.padding=function(t){return arguments.length?(s=D(t),h):s},h.random=function(t){return arguments.length?(d=t,h):d},h.on=function(){const t=u.on.apply(u,arguments);return t===u?h:t},h}():d(),Z.size(o).padding(V).words(h(X)).rotate(()=>void 0===G?30*(~~(6*Y())-3):function(t,e,n){if(t<1)return 0;let r=[];if(1===t)r=[e[0]];else{r=[...e];const n=(e[1]-e[0])/(t-1);let o=e[0]+n;for(;o<e[1];)r.push(o),o+=n}return R(r,n)}(G,J,Y)).spiral(K).random(Y).text(H).font(M).fontStyle(W).fontWeight(U),function e(o,i=1){g&&Z.revive(),Z.fontSize(t=>function(t,e,n){const r=c(t,t=>Number(t.value)),o=f(t,t=>Number(t.value));let i;switch(n){case"log":i=w;break;case"sqrt":i=b;break;case"linear":default:i=v}return i().domain([r,o]).range(e)}(X,o,Q)(t.value)).on("end",l=>{if(X.length!==l.length&&i<=10){10===i&&console.warn(`Unable to layout ${X.length-l.length} word(s) after ${i} attempts.  Consider: (1) Increasing the container/component size. (2) Lowering the max font size. (3) Limiting the rotation angles.`);const t=Math.max(.95*o[0],1);e([t,Math.max(.95*o[1],t)],i+1)}else!function({callbacks:t,options:e,random:n,selection:r,words:o,activeWords:i}){const{getWordColor:s,getWordTooltip:l,onWordClick:c,onWordMouseOver:f,onWordMouseOut:u}=t,{colors:d,enableTooltip:h,fontStyle:y,fontWeight:x,textAttributes:g,tooltipOptions:v}=e,{fontFamily:b,transitionDuration:w}=e;function M(t){return!m(i)&&i.includes(t.text)?"active":"in-active"}function W(t){return s?s(t):R(d,n)}let k;r.selectAll("text").data(o).join(t=>{let e=t.append("text").on("click",t=>{c&&c(t,a)}).on("mouseover",t=>{!h||k&&!k.isDestroyed||(k=p(a.target,z({animation:"scale",arrow:!0,content:()=>l(t),onHidden:t=>{t.destroy(),k=null}},v))),f&&f(t,a)}).on("mouseout",t=>{k&&!k.state.isVisible&&k.destroy(),u&&u(t,a)}).attr("cursor",c?"pointer":"default").attr("fill",W).attr("font-family",b).attr("font-style",y).attr("font-weight",x).attr("text-anchor","middle").attr("transform","translate(0, 0) rotate(0)");"object"==typeof g&&Object.keys(g).forEach(t=>{e=e.attr(t,g[t])}),e=e.call(t=>t.transition().duration(w).attr("class",M).attr("font-size",P).attr("transform",L).text(H))},t=>{t.transition().duration(w).attr("class",M).attr("fill",W).attr("font-family",b).attr("font-size",P).attr("transform",L).text(H)},t=>{t.transition().duration(w).attr("fill-opacity",0).remove()})}({callbacks:t,options:n,random:Y,selection:r,words:l,activeWords:s})}).start()}(N)}const U=["callbacks","maxWords","minSize","options","size","words","activeWords"],V={getWordTooltip:({text:t,value:e})=>`${t} (${e})`},B={colors:l(20).map(t=>t.toString()).map(g(M)),deterministic:!1,enableOptimizations:!1,enableTooltip:!0,fontFamily:"times new roman",fontSizes:[4,32],fontStyle:"normal",fontWeight:"normal",padding:1,rotationAngles:[-90,90],scale:"sqrt",spiral:"rectangular",tooltipOptions:{},transitionDuration:600};function G(a){let{callbacks:l,maxWords:c=100,minSize:f,options:u,size:d,words:h,activeWords:m}=a,y=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)e.indexOf(n=i[r])>=0||(o[n]=t[n]);return o}(a,U);const[p,x,g]=function(t,e,a){const l=n(),[c,f]=r(e),[u,d]=r(null);return o(()=>{const n=l.current;let r=i(n).append("svg").style("display","block");"object"==typeof a&&Object.keys(a).forEach(t=>{r=r.attr(t,a[t])});const o=r.append("g");function c(t,e){r.attr("height",e).attr("width",t),o.attr("transform",`translate(${t/2}, ${e/2})`),f([t,e])}d(o);let u=0,h=0;void 0===e?(u=n.parentElement.offsetWidth,h=n.parentElement.offsetHeight):[u,h]=e,u=Math.max(u,t[0]),h=Math.max(h,t[1]),c(u,h);const m=new s(t=>{if(t&&0!==t.length&&void 0===e){const{width:e,height:n}=t[0].contentRect;c(e,n)}});return m.observe(n),()=>{m.unobserve(n),i(n).selectAll("*").remove()}},[e,t,a]),[l,u,c]}(f,d,u.svgAttributes),v=n(t(N,100));return o(()=>{if(x){const t=z({},V,l),e=z({},B,u);v.current({callbacks:t,maxWords:c,options:e,selection:x,size:g,words:h,activeWords:m})}},[c,l,u,x,g,h,m]),e.createElement("div",z({ref:p,style:{height:"100%",width:"100%"}},y))}G.defaultProps={callbacks:V,maxWords:100,minSize:[300,300],options:B};export default G;export{V as defaultCallbacks,B as defaultOptions};
//# sourceMappingURL=index.modern.js.map
