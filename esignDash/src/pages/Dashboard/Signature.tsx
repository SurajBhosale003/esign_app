import React, { useState } from 'react';
import SignPad from './Sign/SignPad';

function Signature() {
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [signName, setSignName] = useState<string | null>(null);


  const handleSaveSignature = (dataUrl: string) => {
    setSignatureData(dataUrl);
    setUploadedImage(null); 
  };

  function statusCheck()
  {
    console.log("Sign available "+signatureData);
    console.log("Upload available "+uploadedImage);
    // setUploadedImage(null); 
    // setSignatureData(null); 

  }

  const handleUploadImage = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    console.log(imageUrl);
    setSignatureData(null); 
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      {/* <button onClick={statusCheck} className="mb-2 bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300">Status</button> */}
      
      <SignPad onSave={handleSaveSignature} onUpload={handleUploadImage} />
      {signatureData && (
        <div className='bg-gray-200 p-4 mt-4'>
          <h2 className='text-lg font-semibold mb-2'>Signature Preview</h2>
          <img
            src={signatureData}
            alt="Signature"
            style={{ maxWidth: '100%', height: 'auto' }}
            className='border border-gray-300 rounded'
          />
    <div className="flex items-center space-x-2 mt-2 gap-1">
      <input 
        type="text" 
        className="border rounded px-4 py-2 focus:outline-none"
        placeholder="Name of Signature"
      />
     <button className="bg-white text-[#283C42] px-4 py-2 rounded border-2 border-[#283C42] hover:bg-[#283C42] hover:text-white hover:border-transparent transition-colors duration-300">
        Save Signature
      </button>
    </div> 
        
        </div>
      )}

      {uploadedImage && !signatureData && (
        <div className='bg-gray-200 p-4 mt-4'>
          <h2 className='text-lg font-semibold mb-2'>Uploaded Image Preview</h2>
          <img
            src={uploadedImage}
            alt="Uploaded Image"
            style={{ maxWidth: '100%', height: 'auto' }}
            className='border border-gray-300 rounded'
          />
          <div className="flex items-center space-x-2 mt-2 gap-1">
            <input 
              type="text" 
              className="border rounded px-4 py-2 focus:outline-none"
              placeholder="Name of Signature"
            />
            <button className="bg-white text-[#283C42] px-4 py-2 rounded border-2 border-[#283C42] hover:bg-[#283C42] hover:text-white hover:border-transparent transition-colors duration-300">
              Save Signature
            </button>
         </div> 
        </div>
      )}
    </div>
  );
}

export default Signature;
