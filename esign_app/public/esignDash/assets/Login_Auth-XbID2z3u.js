import{r as o,d as b,u as f,a as w,b as j,j as e,L as v,g as l,s as y}from"./index-DIjc9gFd.js";import{Q as N,B as i,Y as c}from"./react-toastify.esm-BD3mGDdm.js";function B(){const[t,d]=o.useState(""),[n,u]=o.useState(""),{login:x,logout:k}=b(),r=f(),g=w(),a=o.useRef(null),m=()=>{l.to(a.current,{x:"-100%",opacity:0,duration:.5,ease:"power2.inOut",onComplete:()=>r("/")})},p=()=>{l.to(a.current,{x:"-100%",opacity:0,duration:.5,ease:"power2.inOut",onComplete:()=>r("/signup")})};j(()=>{l.from(a.current,{x:"-100%",opacity:0,duration:.5,ease:"power2.inOut"})});const h=()=>{x({username:t,password:n}).then(s=>{s.message==="Logged In"&&(g(y({full_name:s.full_name,email:t})),i.success("Login Successfully",{position:"top-right",autoClose:500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark",transition:c}),setTimeout(()=>{r("/dashboard")},1600))}).catch(s=>{console.error("Login failed",s),i.error("Login failed. Please check your credentials.",{position:"top-right",autoClose:500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"dark",transition:c})})};return e.jsxs("div",{className:"h-screen w-screen flex items-center justify-center",children:[e.jsxs("div",{ref:a,className:"flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden",children:[e.jsxs("div",{className:"w-full lg:w-1/2 p-8",children:[e.jsx("div",{className:"relative p-4",children:e.jsx("button",{className:"absolute top-2 left-2 rounded-full bg-[#d1e0e4] p-1 hover:bg-[#a2c1ca]",onClick:m,children:e.jsx("svg",{className:"h-5 w-5 text-gray-600",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M14.348 5.652a.5.5 0 01.707.707l-9.9 9.9a.5.5 0 11-.707-.707l9.9-9.9zM5.653 5.652a.5.5 0 00-.707.707l9.9 9.9a.5.5 0 00.707-.707l-9.9-9.9z",clipRule:"evenodd"})})})}),e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsx("span",{className:"border-b w-1/5 lg:w-1/4"}),e.jsx("p",{className:"text-xs text-center text-gray-500 uppercase",children:"Sign-in with Frappe"}),e.jsx("span",{className:"border-b w-1/5 lg:w-1/4"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",children:"Email Address"}),e.jsx("input",{className:"bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",type:"email",value:t,onChange:s=>d(s.target.value)})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("label",{className:"block text-gray-700 text-sm font-bold mb-2",children:"Password"}),e.jsx(v,{to:"#",className:"text-xs text-gray-500",children:"Forget Password?"})]}),e.jsx("input",{className:"bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",type:"password",value:n,onChange:s=>u(s.target.value)})]}),e.jsx("div",{className:"mt-8",children:e.jsx("button",{onClick:h,className:"bg-[#283C42] text-white font-bold py-2 px-4 w-full rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300",children:"Login"})}),e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsx("span",{className:"border-b w-1/5 md:w-1/4"}),e.jsx("button",{onClick:p,className:"text-xs text-gray-500 uppercase",children:"Don't Have an Account?"}),e.jsx("span",{className:"border-b w-1/5 md:w-1/4"})]})]}),e.jsx("div",{className:"hidden lg:block lg:w-1/2 bg-cover bg-center",style:{backgroundImage:"url('https://images.unsplash.com/photo-1611095780122-d692cee29291?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}})]}),e.jsx(N,{limit:1})]})}export{B as default};