import { Link } from 'react-router-dom';
import DexcissLogo from '../assets/Dexciss_logo.png';

function Navbar_horizontal() {
  return (
    <>
       <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow-md">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <p className="flex items-center">
          <img src={DexcissLogo} className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap"></span>
        </p>
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="navbar-links">
          <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <p className="block py-2 pr-4 pl-3 text-gray-700 rounded lg:p-0 hover:text-[#283C42]">Home</p>
            </li>
            <li>
              <p className="block py-2 pr-4 pl-3 text-gray-700 rounded lg:p-0 hover:text-[#283C42]">About</p>
            </li>
            <li>
              <p className="block py-2 pr-4 pl-3 text-gray-700 rounded lg:p-0 hover:text-[#283C42]">Services</p>
            </li>
            <li>
              <p className="block py-2 pr-4 pl-3 text-gray-700 rounded lg:p-0 hover:text-[#283C42]">Contact</p>
            </li>
          </ul>
        </div>
        <div className="flex items-center lg:order-2 space-x-4">
          <Link to="/login">
            <button className="group flex items-center bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300">
              <svg className="h-6 w-6 mr-2 transition-colors duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="6" cy="6" rx="6" ry="6" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 20 18)" className="group-hover:fill-current group-hover:text-black" fill="#fff" fillOpacity="0.25" />
                <path d="M7.7 12C7.7 8.52061 10.5206 5.7 14 5.7C17.4794 5.7 20.3 8.52061 20.3 12C20.3 15.4794 17.4794 18.3 14 18.3C10.5206 18.3 7.7 15.4794 7.7 12Z" className="group-hover:stroke-current group-hover:text-black" stroke="#283C42" strokeOpacity="0.25" strokeWidth="0.6" />
                <path d="M8 18.9282C9.21615 19.6303 10.5957 20 12 20C13.4043 20 14.7838 19.6303 16 18.9282C17.2162 18.2261 18.2261 17.2162 18.9282 16C19.6303 14.7838 20 13.4043 20 12C20 10.5957 19.6303 9.21615 18.9282 8C18.2261 6.78385 17.2162 5.77394 16 5.0718C14.7838 4.36965 13.4043 4 12 4C10.5957 4 9.21615 4.36965 8 5.0718" className="group-hover:stroke-current group-hover:text-black" stroke="#fff" strokeWidth="1.2" />
                <path d="M2 12L1.53148 11.6252L1.23163 12L1.53148 12.3748L2 12ZM11 12.6C11.3314 12.6 11.6 12.3314 11.6 12C11.6 11.6686 11.3314 11.4 11 11.4V12.6ZM5.53148 6.62518L1.53148 11.6252L2.46852 12.3748L6.46852 7.37482L5.53148 6.62518ZM1.53148 12.3748L5.53148 17.3748L6.46852 16.6252L2.46852 11.6252L1.53148 12.3748ZM2 12.6H11V11.4H2V12.6Z" className="group-hover:fill-current group-hover:text-black" fill="#fff" />
              </svg>
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-gray-100 text-[#283C42] border-2 border-[#283C42] px-4 py-2 rounded hover:bg-[#283C42] hover:text-white hover:border-white transition-colors duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
    
    </>
  )
}

export default Navbar_horizontal