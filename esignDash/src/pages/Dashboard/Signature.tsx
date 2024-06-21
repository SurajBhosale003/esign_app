import React, { useState } from 'react';
import SignPad from './Sign/SignPad';

function Signature() {
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleSaveSignature = (dataUrl: string) => {
    setSignatureData(dataUrl);
    console.log(dataUrl);
    setUploadedImage(null); 
  };

  const handleUploadImage = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    console.log(imageUrl);
    setSignatureData(null); 
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
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
        </div>
      )}
    </div>
  );
}

export default Signature;
