import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';  
// import { useFrappeCreateDoc } from 'frappe-react-sdk';

function SignUp() {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const roles = ["esign"];
    const navigate = useNavigate();
    
    // const { createDoc } = useFrappeCreateDoc();

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
            console.log("data user creation", data);
            if (data.message.status <= 299) {
                alert('User created successfully!');
                navigate('/login');
            } else {
                console.error('Error creating user here data:', data ,"data message ened");
                // Handle other error scenarios as needed
            }   
        // if (data._server_messages) {
        //     const serverMessages = JSON.parse(data._server_messages);
            
        //     let userCreated = false;
        //     serverMessages.forEach(message => {
        //         const parsedMessage = JSON.parse(message);
        //         if (parsedMessage.message.includes(`Newly created user <strong>${email}</strong> has no roles enabled.`)) {
        //             userCreated = true;
        //         }
        //     });

        //     if (userCreated) {
        //         alert('User created successfully!');
        //         navigate('/login');
        //     } else {
        //         throw new Error('Failed to create user.');
        //     }
        // } else {
        //     throw new Error('Failed to create user.');
        // }
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user. Please try again.');
        }
    };
    //     try {
    //         const newUser = {
    //             doctype: 'User',
    //             first_name: fullName,
    //             email: email,
    //             enabled: 1,
    //             new_password: password,
    //              : [{ role: 'System User' }]
    //         }
    
    //         const apiUrl = 'http://127.0.0.1:8002/api/resource/User';
    
    //         const response = await axios.post(apiUrl, newUser, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    
    //         console.log(response.data);
    
    //         if (response.status === 200) {
    //             alert('User created successfully!');
    //             navigate('/login');
    //         } else {
    //             throw new Error('Failed to create user.');
    //         }
    //     } catch (error) {
    //         console.error('Error creating user:', error);
    //         alert('Failed to create user. Please try again.');
    //     }
    
    

    return (
        <div className="mt-20 pt-10">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage: "url('https://images.pexels.com/photos/5273563/pexels-photo-5273563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}></div>
                <div className="w-full p-8 lg:w-1/2">
                    <div className="w-full p-5 lg:w-1/9 relative">
                        <Link to="/">
                            <button className="absolute top-2 right-2 rounded-full bg-[#d1e0e4] p-1 hover:bg-[#a2c1ca]">
                                <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.348 5.652a.5.5 0 01.707.707l-9.9 9.9a.5.5 0 11-.707-.707l9.9-9.9zM5.653 5.652a.5.5 0 00-.707.707l9.9 9.9a.5.5 0 00.707-.707l-9.9-9.9z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </Link>
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
                            <p className="text-xs text-gray-500">Forget Password?</p>
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
                        <Link to="/login">
                            <p className="text-xs text-gray-500 uppercase">Already Have an Account</p>
                        </Link>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
