import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { useState } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('https://your-frappe-instance/api/method/login', {
  //       usr: email,
  //       pwd: password
  //     });
  //     if (response.data.message === 'Logged In') {
  //       const userResponse = await axios.get('https://your-frappe-instance/api/method/frappe.auth.get_logged_user');
  //       alert(`Current user: ${userResponse.data.message}`);
  //       // Redirect to dashboard or set user state here
  //     }
  //   } catch (error) {
  //     console.error('Login failed', error);
  //     alert('Login failed. Please check your credentials.');
  //   }
  // };
  const { currentUser , login, logout , error} = useFrappeAuth();
  const onSubmit = () => { 
    console.log("user"+email + "Password"+password);
    login({
      username:email,
      password:password
    }).then(res => {
      console.log(res);
    })
  };
  return (
    <div className="mt-20 pt-10">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="w-full p-8 lg:w-1/2">
          <div className="w-full p-5 lg:w-1/9 relative">
            <Link to="/">
              <button className="absolute top-2 left-2 rounded-full bg-[#d1e0e4] p-1 hover:bg-[#a2c1ca]">
                <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.348 5.652a.5.5 0 01.707.707l-9.9 9.9a.5.5 0 11-.707-.707l9.9-9.9zM5.653 5.652a.5.5 0 00-.707.707l9.9 9.9a.5.5 0 00.707-.707l-9.9-9.9z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
          {/* <Link to="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300">
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
              </svg>
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign-in with Google</h1>
          </Link> */}
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p className="text-xs text-center text-gray-500 uppercase">Sign-in with Frappe</p>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input className="bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <Link to="#" className="text-xs text-gray-500">Forget Password?</Link>
            </div>
            <input className="bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
          </div>
          <div className="mt-8">
            {/* <Link to="/dashboard"> */}
              <button onClick={onSubmit} className="bg-[#283C42] text-white  font-bold py-2 px-4 w-full rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300">Login</button>
            {/* </Link> */}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to="/signup" className="text-xs text-gray-500 uppercase">Dont Have an Account?</Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage: "url('https://images.unsplash.com/photo-1611095780122-d692cee29291?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

