var v=(n,o,t)=>new Promise((u,h)=>{var m=l=>{try{c(t.next(l))}catch(d){h(d)}},g=l=>{try{c(t.throw(l))}catch(d){h(d)}},c=l=>l.done?u(l.value):Promise.resolve(l.value).then(m,g);c((t=t.apply(n,o)).next())});import{r as s,e as w,f as O,j as e,h as E}from"./index-CvZQwJ2C.js";import{S as R}from"./SignPad-Cykf-Qrt.js";import{Q as k,B as j,Y as y}from"./react-toastify.esm-ZhgozERE.js";import{L as C,g as N}from"./index-DvmFvQBp.js";import{C as _}from"./index-ZvItSMmS.js";import"./index-LZEUtR-U.js";import"./index-jeq-OB0o.js";var I={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},H=function(o,t){return s.createElement(C,N({},o,{ref:t,icon:I}))},A=s.forwardRef(H),D={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"},$=function(o,t){return s.createElement(C,N({},o,{ref:t,icon:D}))},B=s.forwardRef($),M={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"},P=function(o,t){return s.createElement(C,N({},o,{ref:t,icon:M}))},z=s.forwardRef(P);const{Meta:T}=_,U=({refreshSignatures:n,setRefreshSignatures:o})=>{const t=w(O),[u,h]=s.useState([]),[m,g]=s.useState(!0),[c,l]=s.useState(null),d=s.useRef(null);s.useEffect(()=>{(t||n)&&v(void 0,null,function*(){try{const a=yield fetch(`/api/method/esign_app.api.get_signatures?user_mail=${t}`,{method:"GET",headers:{"Content-Type":"application/json"}}),i=yield a.json();a.status===200?(h(i.message.data),g(!1)):(l(i.message.data.toString()),g(!1))}catch(a){l("An error occurred while fetching signatures"),g(!1)}})},[t,n]);function b(){j.error("Deleted successfully",{position:"top-right",autoClose:500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark",transition:y})}function p(){j.error("Failed to delete signature",{position:"top-right",autoClose:500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark",transition:y})}const f=r=>v(void 0,null,function*(){try{const i=yield(yield fetch(`/api/method/esign_app.api.cancel_and_delete_esignature?user_mail=${t}&name=${r}`,{method:"POST",headers:{"Content-Type":"application/json"}})).json();i.message.status===200?(b(),h(u.filter(S=>S.name!==r)),o(!0)):(p(),console.error("Failed to delete signature:",i.message))}catch(a){p(),console.error("Error deleting signature:",a)}}),x=r=>{if(d.current){const{scrollLeft:a,clientWidth:i,scrollWidth:S}=d.current,L=r==="left"?Math.max(a-i,0):Math.min(a+i,S-i);d.current.scrollTo({left:L,behavior:"smooth"})}};return m?e.jsx("div",{children:"Loading..."}):c?e.jsxs("div",{children:["Error: ",c]}):e.jsxs("div",{className:"relative mt-6 min-w-[1000px] max-w-[1000px] mx-auto pl-10 pr-10",children:[u.length>=3&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"scroll-button left absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-2 cursor-pointer z-10",onClick:()=>x("left"),children:e.jsx(B,{})}),e.jsx("button",{className:"scroll-button right absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-2 cursor-pointer z-10",onClick:()=>x("right"),children:e.jsx(z,{})})]}),e.jsx("div",{className:"flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide",ref:d,children:u.map((r,a)=>e.jsx("div",{className:"inline-block",children:e.jsx(_,{style:{width:300},cover:e.jsx("img",{className:"mt-10 h-30",alt:`Signature ${a}`,src:r.sign_blob}),actions:[e.jsx(A,{onClick:()=>f(r.name)},"delete")],children:e.jsx(T,{title:r.sign_name,description:new Date(r.creation).toLocaleString()})})},a))}),e.jsx(k,{limit:1})]})};function V(){const[n,o]=s.useState(null),[t,u]=s.useState(null),[h,m]=s.useState(null),[g,c]=s.useState(!1),l=w(E),d=w(O),b=r=>{c(!1),o(r),u(null)},p=r=>{m(r.target.value)},f=()=>v(this,null,function*(){const r={signature_data:n||t,signature_name:h,user_full_name:l,user_email:d};try{const i=yield(yield fetch("/api/method/esign_app.api.save_signature",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).json();i.message.status<300?(j.success("Sign Created Successfully",{position:"top-right",autoClose:500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark",transition:y}),u(null),o(null),m(""),c(!0)):alert("Error saving signature: "+i.message)}catch(a){console.error("Error:",a),alert("An error occurred while saving the signature")}}),x=r=>{c(!1),u(r),o(null)};return e.jsxs("div",{className:"max-w-lg mx-auto mt-8",children:[e.jsx(R,{onSave:b,onUpload:x}),n&&e.jsxs("div",{className:"bg-gray-200 p-4 mt-4",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Signature Preview"}),e.jsx("img",{src:n,alt:"Signature",style:{maxWidth:"100%",height:"90px"},className:"border border-gray-300 rounded"}),e.jsxs("div",{className:"flex items-center space-x-2 mt-2 gap-1",children:[e.jsx("input",{type:"text",className:"border rounded px-4 py-2 h-10 focus:outline-none",placeholder:"Name of Signature",value:h||"",onChange:p}),e.jsx("button",{onClick:f,className:"bg-white text-[#283C42] px-4 py-2 rounded border-2 border-[#283C42] hover:bg-[#283C42] hover:text-white hover:border-transparent transition-colors duration-300",children:"Save Signature"})]})]}),t&&!n&&e.jsxs("div",{className:"bg-gray-200 p-4 mt-4",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Uploaded Image Preview"}),e.jsx("img",{src:t,alt:"Uploaded Image",style:{maxWidth:"100%",height:"auto"},className:"border border-gray-300 rounded"}),e.jsxs("div",{className:"flex items-center space-x-2 mt-2 gap-1",children:[e.jsx("input",{type:"text",className:"border rounded px-4 py-2 focus:outline-none",placeholder:"Name of Signature",onChange:p}),e.jsx("button",{onClick:f,className:"bg-white text-[#283C42] px-4 py-2 rounded border-2 border-[#283C42] hover:bg-[#283C42] hover:text-white hover:border-transparent transition-colors duration-300",children:"Save Signature"})]})]}),e.jsx(U,{refreshSignatures:g,setRefreshSignatures:c})]})}export{V as default};