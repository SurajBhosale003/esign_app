import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SignPad from './Sign/SignPad';
import { selectFullName, selectEmail } from '../../redux/selectors/userSelector'
import AllSignatures from './Sign/AllSignatures';

function Signature() {
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [signName, setSignName] = useState<string | null>(null);
  const fullName = useSelector(selectFullName);
  const email = useSelector(selectEmail);

  const handleSaveSignature = (dataUrl: string) => {
    setSignatureData(dataUrl);
    setUploadedImage(null); 
  };
  const handleSignatureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignName(e.target.value);
  };
  const handleSaveSignatureInDB = async () => {
    const signatureObject = {
      signature_data: signatureData || uploadedImage,
      signature_name: signName,
      user_full_name: fullName,
      user_email: email,
    };

    try {
      const response = await fetch('/api/method/esign_app.api.save_signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signatureObject),
      });

      const result = await response.json();

      if (result.message.status < 300) {
        alert('Signature saved successfully');
        setUploadedImage(null); 
        setSignatureData(null);
        setSignName("");

      } else {
        alert('Error saving signature: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the signature');
    }
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
            style={{ maxWidth: '100%', height: '90px' }}
            className='border border-gray-300 rounded'
          />
    <div className="flex items-center space-x-2 mt-2 gap-1">
    <input 
              type="text" 
              className="border rounded px-4 py-2 h-10 focus:outline-none"
              placeholder="Name of Signature"
              value={signName || ''}
              onChange={handleSignatureInput}
            />
     <button onClick={handleSaveSignatureInDB} className="bg-white text-[#283C42] px-4 py-2 rounded border-2 border-[#283C42] hover:bg-[#283C42] hover:text-white hover:border-transparent transition-colors duration-300">
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
              onChange={handleSignatureInput}
            />
            <button onClick={handleSaveSignatureInDB} className="bg-white text-[#283C42] px-4 py-2 rounded border-2 border-[#283C42] hover:bg-[#283C42] hover:text-white hover:border-transparent transition-colors duration-300">
              Save Signature
            </button>
         </div> 
        </div>
      )}
      <AllSignatures/>
    </div>
  );
}

export default Signature;
