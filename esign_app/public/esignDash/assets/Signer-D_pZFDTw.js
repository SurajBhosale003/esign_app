var ee=Object.defineProperty,te=Object.defineProperties;var se=Object.getOwnPropertyDescriptors;var z=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var J=(u,r,i)=>r in u?ee(u,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):u[r]=i,_=(u,r)=>{for(var i in r||(r={}))ae.call(r,i)&&J(u,i,r[i]);if(z)for(var i of z(r))ie.call(r,i)&&J(u,i,r[i]);return u},S=(u,r)=>te(u,se(r));var M=(u,r,i)=>new Promise((j,l)=>{var f=y=>{try{o(i.next(y))}catch(N){l(N)}},m=y=>{try{o(i.throw(y))}catch(N){l(N)}},o=y=>y.done?j(y.value):Promise.resolve(y.value).then(f,m);o((i=i.apply(u,r)).next())});import{r as d,f as le,c as de,e as re,u as ne,j as t,M as ce}from"./index-DIjc9gFd.js";import{Q as ue}from"./react-toastify.esm-BD3mGDdm.js";import{d as oe,P as he,S as xe}from"./SignInput-CbWWIY1S.js";import{e as fe}from"./extractUniqueElements-Cb8tlYgU.js";import{d as D}from"./dayjsConfig-CMD9bLJt.js";import"./SignPad-NT20Ia7p.js";import"./index-BhjCMKpx.js";import"./index-CN1wDC8h.js";import"./index-BM3f3SIG.js";const ke=()=>{var U,$;const[u,r]=d.useState(!1),[i,j]=d.useState([]),[l,f]=d.useState(null),[m,o]=d.useState(null),[y,N]=d.useState("");d.useState("");const[g,w]=d.useState(0),[C,H]=d.useState(oe),[ge,v]=d.useState(null),A=d.useRef(null),k=d.useRef(null),F=d.useRef(null),Y=le(),[pe,q]=d.useState([]),{documentData:h}=Y.state||{},E=de(re),B=ne();if(!h)return console.log("No document data",JSON.stringify(h)),t.jsx("p",{children:"Document not found"});d.useEffect(()=>{var e;if(l!==null){const a=i.find(s=>s.id===l);v(a?{id:a.id,type:a.type,checked:(e=a.checked)!=null?e:!1,content:a.content}:null)}},[l,m,i]),d.useEffect(()=>{M(void 0,null,function*(){try{const s=yield(yield fetch(`/api/method/esign_app.api.get_document_components_and_basepdf?document_name=${h?h.name:""}`)).json();if(console.log(s),s.message.document_json_data==null||s.message.base_pdf_datad==null)return;if(s.message.status===200){const c=typeof s.message.document_json_data=="string"?JSON.parse(s.message.document_json_data):s.message.document_json_data,n=typeof s.message.base_pdf_datad=="string"?JSON.parse(s.message.base_pdf_datad):s.message.base_pdf_datad,p=typeof s.message.assigned_users=="string"?JSON.parse(s.message.assigned_users):s.message.assigned_users;try{for(let b in p)if(p.hasOwnProperty(b)){const x=p[b];if(x.email===E){if(console.log(`Email found at index ${b}, status: ${x.status}`),x.status==="unseen"){x.status="open",p[b]=x;const Z={document_title:h.name,assigned_user_list:JSON.stringify(p)};try{const I=yield(yield fetch("/api/method/esign_app.api.patch_user_status_document",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Z)})).json();console.log(JSON.stringify(I)),I.message.status<300}catch(R){console.error("Error:",R)}}else x.status==="close"&&(r(!0),console.log(`Status: ${x.status}`));break}}}catch(b){}j(c),H(n)}}catch(a){console.error("Error:",a)}}),P()},[]);const P=()=>{const e=fe(i);q(e)};d.useEffect(()=>{P()},[i]),d.useEffect(()=>{var e;if(l!==null){const a=i.find(s=>s.id===l);v(a?{id:a.id,type:a.type,checked:(e=a.checked)!=null?e:!1,content:a.content}:null)}},[l,m,i]);const V=()=>{g<C.length-1&&(w(g+1),o(null),f(null))},L=()=>{g>0&&(w(g-1),o(null),f(null))},Q=e=>{j(a=>a.map(s=>s.id===l?S(_({},s),{content:e,value:e}):s)),o(null),f(null),v(null)},O=()=>{o(null)},W=(e,a)=>{const s=e.target.checked;j(c=>c.map(n=>n.id===a?S(_({},n),{checked:s}):n))},T=(e,a)=>{const s=e.target.value;j(c=>c.map(n=>n.id===a?S(_({},n),{content:s,value:s}):n))},G=e=>{const a=e.target.value;l!==null&&j(s=>s.map(c=>c.id===l?S(_({},c),{content:a,value:a}):c))},K=e=>{e.target.closest(".component")||(f(null),o(null))};d.useEffect(()=>{if(l!==null){const e=document.querySelector(`[data-id="${l}"]`);o(e);const a=i.find(s=>s.id===l);(a==null?void 0:a.type)==="text"&&N(a.content||"")}},[l,i]),d.useEffect(()=>{if(l!==null){const e=i.find(a=>a.id===l);v(e?{id:e.id,type:e.type,checked:e.checked||!1,content:e.content||""}:null)}},[l,m,i]);const X=(e,a)=>{var c;const s=(c=e.target.files)==null?void 0:c[0];if(s){const n=new FileReader;n.onloadend=()=>{const p=n.result;j(b=>b.map(x=>x.id===a?S(_({},x),{content:p}):x))},n.readAsDataURL(s)}};return h?t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"text-xs flex items-center gap-3 relative p-6 bg-[#283C42] text-white border-2 border-transparent hover:border-[#283C42] transition-colors duration-300",children:[t.jsx("div",{children:t.jsx("button",{className:"button",onClick:()=>B(-1),children:t.jsxs("div",{className:"button-box",children:[t.jsx("span",{className:"button-elem",children:t.jsx("svg",{viewBox:"0 0 46 40",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{d:"M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"})})}),t.jsx("span",{className:"button-elem",children:t.jsx("svg",{viewBox:"0 0 46 40",children:t.jsx("path",{d:"M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"})})})]})})}),t.jsxs("div",{children:[t.jsx("h1",{className:"text-xl font-bold ",style:{fontVariant:"small-caps"},children:h.document_title}),t.jsx("p",{className:"text-xs",children:h.template_title}),t.jsxs("p",{className:"text-xs",children:["Email: ",h.owner_email]}),t.jsxs("p",{className:"text-sm",children:["Created At: ",D(h.document_created_at).format("DD/MM/YYYY - HH:mm")," (",D().to(D(h.document_created_at)),")"]})]})]}),t.jsxs("div",{className:`${u?"":"templete-main-div-signer"} `,children:[t.jsxs("div",{className:"templete-app text-xs",children:[t.jsxs("div",{className:"flex gap-3 mb-2",children:[t.jsx("button",{className:"bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300",onClick:L,disabled:g===0,children:"Previous"}),t.jsxs("h1",{className:"mt-2",children:[g+1," / ",C.length]}),t.jsx("button",{className:"bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300",onClick:V,disabled:g===C.length-1,children:"Next"})]}),t.jsxs("div",{className:"workspace",ref:k,onClick:K,children:[t.jsx(he,{pdfData:C[g].data}),i.filter(e=>e.pageNo===g).map(e=>{var a,s,c,n;return t.jsxs("div",{"data-id":e.id,className:`component ${e.type} ${l===e.id?"selected":""}`,style:{position:"absolute",top:e.position.top,left:e.position.left,width:(s=(a=e.size)==null?void 0:a.width)!=null?s:0,height:(n=(c=e.size)==null?void 0:c.height)!=null?n:0,border:l===e.id?"1px solid red":"none",fontSize:`${e.fontSize}px`,userSelect:"none",overflow:"hidden"},onClick:p=>{p.stopPropagation(),f(e.id)},children:[e.type==="text"&&t.jsx("div",{style:{width:"100%",height:"100%",overflow:"hidden",fontSize:"inherit",outline:"none"},children:e.value||"Text Here"}),e.type==="image"&&!e.content&&t.jsx("div",{}),e.type==="v_image"&&!e.content&&t.jsx("div",{}),(e.type==="image"||e.type==="v_image"||e.type==="signature"||e.type==="v_signature")&&e.content&&t.jsx("img",{src:e.content,alt:"Uploaded",style:{width:"100%",height:"100%"}}),e.type==="checkbox"&&t.jsx("input",{type:"checkbox",checked:e.checked||!1}),e.type==="m_date"&&t.jsx("input",{type:"date",value:e.content||""}),e.type==="live_date"&&t.jsx("input",{type:"date",value:new Date().toISOString().split("T")[0]}),e.type==="fix_date"&&t.jsx("input",{type:"date",value:e.content||""}),e.type==="v_text"&&t.jsx("div",{children:e.content||"Editable Text"})]},e.id)}),t.jsx(ce,{ref:A,bounds:{left:0,top:0,right:((U=k.current)==null?void 0:U.offsetWidth)||0,bottom:(($=k.current)==null?void 0:$.offsetHeight)||0}})]})]}),t.jsx("div",{className:`right-div-signer p-5 cursor-pointer ${u?"hidden":""}`,children:t.jsxs("table",{className:"w-full signer-table",children:[t.jsxs("thead",{children:[t.jsx("th",{children:"Sr."}),t.jsx("th",{children:"Component"}),t.jsx("th",{children:"Page No."}),t.jsx("th",{children:"Input"})]}),t.jsx("tbody",{children:i.filter(e=>{var a;return(a=e.assign)==null?void 0:a.includes(E)}).map((e,a)=>t.jsxs("tr",{className:l===e.id?"selected-row":"",onClick:()=>{f(e.id),w(e.pageNo),O()},children:[t.jsx("td",{children:a+1}),t.jsx("td",{onClick:()=>{f(e.id);const s=document.querySelector(`[data-id="${e.id}"]`);o(s)},children:e.name}),t.jsx("td",{children:e.pageNo+1}),t.jsxs("td",{className:"max-w-[18vw]",children:[(e==null?void 0:e.type)==="signature"&&t.jsx(xe,{onSelect:Q,onClickbtn:O}),(e==null?void 0:e.type)==="image"&&t.jsx("input",{type:"file",accept:"image/*",onChange:s=>X(s,e.id)}),(e==null?void 0:e.type)==="checkbox"&&t.jsx("input",{type:"checkbox",checked:e.checked||!1,onChange:s=>W(s,e.id)}),(e==null?void 0:e.type)==="m_date"&&t.jsx("input",{type:"date",value:e.content||"",onChange:s=>T(s,e.id)}),(e==null?void 0:e.type)==="live_date"&&t.jsx("input",{type:"date",value:new Date().toISOString().split("T")[0],readOnly:!0}),(e==null?void 0:e.type)==="fix_date"&&t.jsx("input",{type:"date",value:e.content||"",onChange:s=>T(s,e.id)}),(e==null?void 0:e.type)==="text"&&t.jsx("input",{className:"bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",ref:F,type:"text",value:e.content||"",onClick:()=>{f(e.id),w(e.pageNo)},onChange:G,placeholder:"Edit text here"})]})]},e.id))})]})})]}),t.jsx(ue,{limit:1})]}):t.jsx("div",{children:"No Doc data available"})};export{ke as default};