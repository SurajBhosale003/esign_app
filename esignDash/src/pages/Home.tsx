import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import SignImage from '../assets/HomePage/sign.jpg';
import SignImage2 from '../assets/HomePage/sign2.jpg';
// import { useRef } from 'react';

function Home() {
  // const gsapRef = useRef();
  useGSAP(()=>{
    gsap.from(".home-card-2",{
      x:500,
      y:200,
      duration:2,
      opacity:0,
      ease: 'power3.out',
      delay:1
    })
    gsap.to(".home-card-1",{
      y:-100,
      duration:2,
      ease: 'power3.out',
      delay:1
    })
    gsap.from(".home-main-headline",{
      opacity: 0,
      duration:2
    })
  })  

  return (
    <div className='overflow-hidden'>
      <div className="flex items-center justify-center">
        <span className="home-main-headline font-bold text-[170px] mt-20 text-[#283C42] hover:cursor-default">
          <span className=''>Document</span> <span className="text-[175px] font-bold text-white text-stroke">Sign</span>
        </span>
      </div>
      <div>
        <div className="flex justify-between mt-15 mx-20">
          <div className="home-card-1 outline-dashed outline-2 outline-offset-2 m-20 mt-60 relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <img src={SignImage} alt="card-image" />
            </div>
            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 pl-6">
                eSignature
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-justify pr-8 pl-8">
                E-sign, short for electronic signature, revolutionizes document management by enabling secure and efficient authentication of digital contracts and agreements, streamlining workflows and reducing paper usage.
              </p>
            </div>
            <div className="p-6 pt-0">
              <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">
                Read More
              </button>
            </div>
          </div>

          <div className="home-card-2 outline-dashed outline-2 outline-offset-2 relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 h-96 overflow-hidden transform rotate-[-20deg]">
            <div className="relative h-3/5 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <img src={SignImage2} alt="card-image" />
            </div>
            <div className="p-6">
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                Offers convenience and legality in the digital era, ensuring seamless transactions while adhering to regulatory compliance.
              </p>
            </div>
            <div className="p-6 pt-0">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
