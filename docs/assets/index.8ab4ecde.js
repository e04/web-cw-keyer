var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,l=(e,t)=>{for(var r in t||(t={}))a.call(t,r)&&o(e,r,t[r]);if(n)for(var r of n(t))s.call(t,r)&&o(e,r,t[r]);return e},c=(e,n)=>t(e,r(n));import{c as u,r as i,A as p,O as m,R as d,C as g,S as x,T as f,H as E,B as S,a as w,b as y,d as v,e as h,f as T,g as b,I as M,h as C,i as O,j as k,k as R}from"./vendor.a4fa4a0b.js";u.lookAhead=.02;const P=()=>{const e=i.exports.useRef(null),t=i.exports.useRef(null);i.exports.useEffect((()=>(e.current=new p({attack:.002,decay:0,sustain:0,release:.02}).toDestination(),t.current=new m(800,"sine").connect(e.current),()=>{var r,n;null==(r=e.current)||r.dispose(),null==(n=t.current)||n.dispose()})),[]);return{start:i.exports.useCallback((()=>{var r,n;null==(r=t.current)||r.start(),null==(n=e.current)||n.triggerAttack()}),[]),stop:i.exports.useCallback((()=>{var t;null==(t=e.current)||t.triggerRelease()}),[])}},j={A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",1:".----",2:"..---",3:"...--",4:"....-",5:".....",6:"-....",7:"--...",8:"---..",9:"----.",0:"-----","/":"-..-.","+":".-.-.","=":"-...-","?":"..--..",".":".-.-.-",",":"--..--",":":"---...","(":"-.--.",")":"-.--.-","@":".--.-.","-":"-....-",'"':".-..-.","!":"..--.",$:"...-..-","'":".----.","`":".-----.","&":". ...",";":"-.-.-."},U={fontFamily:'"Menlo", "Courier", monospace'},I=()=>{const e=()=>{const e=localStorage.getItem("config");return e?JSON.parse(e):{speed:15,memory:["R UR 599 <BK>","TU <VA> E E","","","","","","","",""],memoText:""}},t=e=>{localStorage.setItem("config",JSON.stringify(e))};return{setMemory:r=>{t(c(l({},e()),{memory:r}))},setSpeed:r=>{t(c(l({},e()),{speed:r}))},setMemoText:r=>{t(c(l({},e()),{memoText:r}))},getMemory:()=>e().memory,getSpeed:()=>e().speed,getMemoText:()=>e().memoText}},z=e=>new Promise((t=>setTimeout(t,e))),A=()=>{const e=I(),[t,r]=i.exports.useState(e.getSpeed()),[n,a]=i.exports.useState(""),[s,o]=i.exports.useState(!1),[l,c]=i.exports.useState(""),u=i.exports.useRef(""),p=P(),m=i.exports.useRef(!1),d=async()=>{if(0===u.current.length)return o(!1),void c((e=>e+" "));o(!0);const e=u.current.slice(0,1);switch(e){case"<":m.current=!0,await z(10);break;case">":m.current=!1,await z(10);break;default:await(async(e,t,r,n)=>{const a=j[e],s=6e4/(50*t);if(null==a)return void(await z(3*s));const o=a.split("");for(const l of o)"."===l&&(n.start(),await z(s)),"-"===l&&(n.start(),await z(3*s)),n.stop(),await z(s);await await z(s*(r?0:2))})(e,t,m.current,p)}c((t=>t+e)),a((e=>{const t=e.slice(1);return u.current=e.slice(1),t})),d()};return{sendingText:n,sentText:l,send:e=>{a(e.toUpperCase()),u.current=e.toUpperCase(),s||d()},addSend:e=>{a((t=>t+" "+e)),u.current=u+" "+e,s||d()},speed:t,setSpeed:t=>{r(t),e.setSpeed(t)}}};function B(){const e=P(),t=A(),r=I(),n=(()=>{const[e,t]=i.exports.useState(""),r=I();return i.exports.useEffect((()=>{t(r.getMemoText())}),[]),{setText:e=>{const n=e.toUpperCase();t(n),r.setMemoText(n)},text:e}})(),a=i.exports.useRef(null),[s,o]=i.exports.useState(r.getMemory());return i.exports.useEffect((()=>{var e;null!=a.current&&(a.current.scrollLeft=null==(e=a.current)?void 0:e.scrollWidth)}),[t.sentText]),d.createElement(g,{pt:2},d.createElement(x,{spacing:4},d.createElement(f,{placeholder:"MEMO",size:"xs",resize:"vertical",variant:"flushed",value:n.text,onChange:e=>n.setText(e.target.value)}),d.createElement(E,{spacing:4},d.createElement(S,{w:8},d.createElement(w,{fontSize:"xl",align:"center"},t.speed),d.createElement(w,{fontSize:"xs",color:"gray"},"WPM")),d.createElement(y,{value:t.speed,onChange:e=>{t.setSpeed(e)},max:40,min:5},d.createElement(v,null,d.createElement(h,null)),d.createElement(T,null)),d.createElement(b,{w:24,colorScheme:"blue",onMouseDown:()=>{e.start()},onMouseUp:()=>{e.stop()},onMouseLeave:()=>{e.stop()},onTouchStart:()=>{e.start()},onTouchEnd:()=>{e.stop()},onTouchCancel:()=>{e.stop()}}),d.createElement(b,{w:24,colorScheme:"red",onClick:()=>{t.send("")}},"STOP")),d.createElement(E,{spacing:0},d.createElement(S,{w:"50%"},d.createElement(w,{ref:a,color:"gray",align:"right",sx:l({opacity:.5,marginBottom:"1px",whiteSpace:"nowrap",overflow:"scroll","&::-webkit-scrollbar":{display:"none"}},U)},t.sentText)),d.createElement(S,{w:"50%"},d.createElement(M,{sx:U,variant:"flushed",value:t.sendingText,onChange:e=>{t.send(e.target.value)}}))),s.map(((e,n)=>d.createElement(C,{key:n},d.createElement(M,{sx:U,pr:"16",value:e,onChange:e=>{((e,t)=>{o((n=>{const a=n.slice(0);return a[t]=e.toUpperCase(),r.setMemory(a),a}))})(e.target.value,n)}}),d.createElement(O,{width:"16",p:1},d.createElement(b,{borderRadius:"3",colorScheme:"blue",size:"sm",variant:"outline",onClick:()=>{(e=>{const r=s[e];t.sendingText.length>0?t.addSend(r):t.send(r)})(n)}},"SEND")))))))}k.render(d.createElement(d.StrictMode,null,d.createElement(R,null,d.createElement(B,null))),document.getElementById("root"));