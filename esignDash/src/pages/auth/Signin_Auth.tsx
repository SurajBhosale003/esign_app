import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast ,Flip } from 'react-toastify';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
// import axios from 'axios';  
// import { useFrappeCreateDoc } from 'frappe-react-sdk';

function SignUp() {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const handleSignUp = async () => {
    
        try {
            const response = await fetch("/api/method/esign_app.api.create_user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    password: password,
                    // roles:roles,
                })
            });
    
            const data = await response.json();
            // // // console.log("data user creation", data);
            if (data.message.status <= 299) {
                toast.success('User Registered Successfully', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                    });
               
                setTimeout(() => {
                    navigate('/login');
                  }, 1600);
            } else {
                console.error('Error creating user here data:', data ,"data message ened");
                if (data.message && data.message.message.includes("Duplicate entry")) {
                  toast.error('User Email Already Exist', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                    });
                    return;
                }
                toast.error('User Creation Error', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                    });

            }   
        
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user. Please try again.');
        }
    };
    
    const sinUpRef = useRef(null);

    const navigateToBack = () => {
        gsap.to(sinUpRef.current, {
            x: '100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => navigate('/'),
        });
    }
    const handleLoginRedirect = () => {
        gsap.to(sinUpRef.current, {
            x: '100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => navigate('/login'),
        });
    };
    useGSAP(()=>{ 
        gsap.from(sinUpRef.current, {
            x: '100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
        });
    })
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          handleSignUp(); 
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [email, password]);

    return (
        <div className="h-screen w-screen flex items-center justify-center">
        <div ref={sinUpRef} className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/5273563/pexels-photo-5273563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
          >
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <div className="relative p-4">
              <button 
                onClick={navigateToBack} 
                className="absolute top-2 right-2 rounded-full bg-[#d1e0e4] p-1 hover:bg-[#a2c1ca]"
              >
                <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.348 5.652a.5.5 0 01.707.707l-9.9 9.9a.5.5 0 11-.707-.707l9.9-9.9zM5.653 5.652a.5.5 0 00-.707.707l9.9 9.9a.5.5 0 00.707-.707l-9.9-9.9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <p className="text-xs text-center text-gray-500 uppercase">or Signup with email</p>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input 
                className="bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" 
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input 
                className="bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
               
              </div>
              <input 
                className="bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <button 
                onClick={handleSignUp} 
                className="bg-[#283C42] text-white font-bold py-2 px-4 w-full rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300"
              >
                Create an Account
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <p 
                onClick={handleLoginRedirect}  
                className="cursor-pointer text-xs text-gray-500 uppercase"
              >
                Already Have an Account
              </p>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
        <ToastContainer limit={1} />
      </div>
    );
}

export default SignUp;
