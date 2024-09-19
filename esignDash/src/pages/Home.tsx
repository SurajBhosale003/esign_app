import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import SignImage from '../assets/HomePage/sign.jpg';
import SignImage2 from '../assets/HomePage/sign2.jpg';
import Footer from '../components/Footer'
function Home() {
  // const username = useSelector(selectFullName);
  // const email = useSelector(selectEmail);

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
  const items = Array.from({ length: 6 }, (_, index) => index + 1);
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
      <div className=" cursor-default grid grid-cols-2 pl-[10rem] pr-[10rem]">
<div
  className="w-[30rem] h-[20rem] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-3 space-y-3 relative overflow-hidden"
>

  <div className="fill-[#283C42] w-12">
  <svg
      viewBox="0 0 24 24"
      fill="#283C42"
      height="4em"
      width="6em"
     
    >
      <path d="M3 14l.5.07L8.07 9.5a1.95 1.95 0 01.52-1.91c.78-.79 2.04-.79 2.82 0 .53.52.7 1.26.52 1.91l2.57 2.57.5-.07c.18 0 .35 0 .5.07l3.57-3.57C19 8.35 19 8.18 19 8a2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2c-.18 0-.35 0-.5-.07l-3.57 3.57c.07.15.07.32.07.5a2 2 0 01-2 2 2 2 0 01-2-2l.07-.5-2.57-2.57c-.32.07-.68.07-1 0L4.93 15.5 5 16a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2z" />
    </svg>
  </div>
  <h1 className="font-bold text-xl text-[#283C42]">Efficiency and Time-Saving</h1>
  <p className="text-sm text-zinc-500 leading-6">
  eSign platforms streamline document workflows by enabling users to create reusable templates for frequently used forms. This reduces the need for repetitive tasks and accelerates document creation and signing processes.
  </p>
</div>

<div
  className="w-[30rem] h-[20rem] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-3 space-y-3 relative overflow-hidden"
>

  <div className="fill-[#283C42]  w-12">
  <svg
      viewBox="0 0 24 24"
      fill="283C42"
      height="4em"
      width="4em"
      
    >
      <path d="M3 1h16a1 1 0 011 1v4a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1m0 8h16a1 1 0 011 1v.67l-2.5-1.11-6.5 2.88V15H3a1 1 0 01-1-1v-4a1 1 0 011-1m0 8h8c.06 2.25 1 4.4 2.46 6H3a1 1 0 01-1-1v-4a1 1 0 011-1M8 5h1V3H8v2m0 8h1v-2H8v2m0 8h1v-2H8v2M4 3v2h2V3H4m0 8v2h2v-2H4m0 8v2h2v-2H4m13.5-7l4.5 2v3c0 2.78-1.92 5.37-4.5 6-2.58-.63-4.5-3.22-4.5-6v-3l4.5-2m0 1.94L15 15.06v2.66c0 1.54 1.07 2.98 2.5 3.34v-7.12z" />
    </svg>

  </div>
  <h1 className="font-bold text-xl text-[#283C42]">Enhanced Security</h1>
  <p className="text-sm text-zinc-500 leading-6">
  eSign solutions typically include encryption, audit trails, and authentication measures, ensuring that documents are securely transmitted, signed, and stored. This guarantees the integrity and confidentiality of sensitive data throughout the entire process.
  </p>
</div>

<div
  className="w-[30rem] h-[20rem] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-3 space-y-3 relative overflow-hidden"
>

  <div className="fill-[#283C42]  w-12">
  <svg
      fill="283C42"
      viewBox="0 0 16 16"
      height="4em"
      width="4em"
    >
      <path d="M9.5 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6 5.5l-4.535-.442A.531.531 0 011.531 4H14.47a.531.531 0 01.066 1.058L10 5.5V9l.452 6.42a.535.535 0 01-1.053.174L8.243 9.97c-.064-.252-.422-.252-.486 0l-1.156 5.624a.535.535 0 01-1.053-.174L6 9V5.5z" />
    </svg>
  </div>
  <h1 className="font-bold text-xl text-[#283C42]">Accessibility and Flexibility</h1>
  <p className="text-sm text-zinc-500 leading-6">
  eSign platforms enable users to create, send, and sign documents from anywhere. This eliminates the need for physical paperwork and allows for quick turnaround, even when working remotely or across different time zones.
  </p>
</div>

<div
  className="w-[30rem] h-[20rem] bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-3 space-y-3 relative overflow-hidden"
>
 
  <div className="fill-[#283C42]  w-12">
  <svg
      viewBox="0 0 24 24"
      fill="283C42"
      height="4em"
      width="4em"
    >
      <path d="M15 15v2h8v-2m-8.03-3.39C14.85 10.28 13.59 8.97 12 9c-1.7.03-3 1.3-3 3s1.3 2.94 3 3c.38 0 .77-.08 1.14-.23.27-1.1.72-2.14 1.83-3.16M13 16H7a2 2 0 00-2-2v-4c1.11 0 2-.89 2-2h10a2 2 0 002 2v.06c.67 0 1.34.12 2 .34V6H3v12h10.32a6.38 6.38 0 01-.32-2z" />
    </svg>
  </div>
  <h1 className="font-bold text-xl text-[#283C42]">Cost Reduction</h1>
  <p className="text-sm text-zinc-500 leading-6">
  By eliminating the need for physical paper, printing, and mailing, eSign solutions significantly cut operational costs. Additionally, reducing paper usage contributes to more environmentally sustainable business practices, while also lowering storage and archiving expenses.
  </p>
</div>

    </div>
 <Footer/>
    </div>
  );
}

export default Home;
