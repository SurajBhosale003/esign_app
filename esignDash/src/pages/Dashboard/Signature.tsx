import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SignPad from './Sign/SignPad';
import { selectFullName, selectEmail } from '../../redux/selectors/userSelector';
import AllSignatures from './Sign/AllSignatures';
import 'react-toastify/dist/ReactToastify.css';
import {  toast ,Flip } from 'react-toastify';

function Signature() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [signName, setSignName] = useState<string | null>(null);
  const [refreshSignatures, setRefreshSignatures] = useState<boolean>(false); 
  const [formData, setFormData] = useState({
    companyName: '',
    department: '',
    state: '',
    country: '',
    password: '',
    verifyPassword: '',
    keyPassphrase: '',
    verifyKeyPassphrase: '',
  });
  const fullName = useSelector(selectFullName);
  const email = useSelector(selectEmail);

  const handleClearAll = () =>{
    setSignatureData(null);
    setUploadedImage(null);
    setSignName(null);

  }

  const handleSaveSignature = (dataUrl: string) => {
    setRefreshSignatures(false);
    setSignatureData(dataUrl);
    setUploadedImage(null); 
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleSignatureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const formattedValue = newValue.replace(/\s{2,}/g, ' ');
    setSignName(formattedValue);
  };

  const handleSaveSignatureInDB = async () => {
    if(signatureData=='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAD6CAYAAAAcA2ajAAAKHUlEQVR4Xu3VMQ0AAAzDsJU/6ZHI6QHoYU3KxzhEgQIAAAQKZwLIlQwQIECBAgMAJqycgQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQICKsfIECAAAECoYCwhpimCBAgQICAsPoBAgQIECAQCghriGmKAAECBAgIqx8gQIAAAQKhgLCGmKYIECBAgICw+gECBAgQIBAKCGuIaYoAAQIECAirHyBAgAABAqGAsIaYpggQIECAgLD6AQIECBAgEAoIa4hpigABAgQIPObGAPuo15IPAAAAAElFTkSuQmCC')
    {
      toast.error('Blank Sign-Pad', {
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
    if(signName=='' || signName==null)
    {
      toast.error('Enter Sign Name', {
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
    if(signName.length < 4)
      {
        toast.error('At Least 4 Words Needed', {
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
    const signatureObject = {
      signature_data: signatureData || uploadedImage,
      signature_name: signName,
      user_full_name: fullName,
      user_email: email,
      company_name : formData.companyName,
      department : formData.department,
      state : formData.state,
      country_code : formData.country,
      passphrase : formData.keyPassphrase,
      password : formData.password,
      public_key : "ghsaydgyiawgy&5792#",
      private_key : "ahgsydwh%#$%9817",
    };
    console.log(signatureObject)
    console.log(formData)
    // return;
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
        // alert('Signature saved successfully');
        toast.success('Sign Created Successfully', {
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
          handleClearAll();
        
        setRefreshSignatures(true); 
      } else {
        alert('Error saving signature: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the signature');
    }
  };

  const handleUploadImage = (imageUrl: string) => {
    setRefreshSignatures(false);
    setUploadedImage(imageUrl);
    setSignatureData(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (uploadedImage!=null || signatureData!==null)) {
        handleSaveSignatureInDB(); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [uploadedImage,signatureData ,signName]);


  return (
    <div className=" mx-auto mt-8">
      <SignPad onSave={handleSaveSignature} onUpload={handleUploadImage} />
      
      { (signatureData || uploadedImage) && ( 
        <div className="bg-gray-200 p-4 mt-4 flex flex-row">
        {signatureData ? (
          <>
            <div>
              <h2 className="text-lg font-semibold mb-2">Signature Preview</h2>
              <img
                src={signatureData}
                alt="Signature"
                style={{ maxWidth: '100%', height: '250px' }}
                className="border border-gray-300 rounded"
                />
            </div>
          </>
        ) : uploadedImage ? (
          <>
          <div>
            <h2 className="text-lg font-semibold mb-2">Uploaded Image Preview</h2>
            <img
              src={uploadedImage}
              alt="Uploaded Image"
              style={{ maxWidth: '100%', height: '250px' }}
              className="border border-gray-300 rounded"
              />
          </div>
          </>
        ) : null}
      <div className='p-5'>
        <div>
        <form className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2 py-1 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  px-2 py-1 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  px-2 py-1 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  px-2 py-1 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  px-2 py-1 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="verifyPassword" className="block text-sm font-medium text-gray-700">Verify Password</label>
            <input
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              value={formData.verifyPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  px-2 py-1 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="keyPassphrase" className="block text-sm font-medium text-gray-700">Key Passphrase</label>
            <input
              type="password"
              id="keyPassphrase"
              name="keyPassphrase"
              value={formData.keyPassphrase}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  px-2 py-1 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="verifyKeyPassphrase" className="block text-sm font-medium text-gray-700">Verify Key Passphrase</label>
            <input
              type="password"
              id="verifyKeyPassphrase"
              name="verifyKeyPassphrase"
              value={formData.verifyKeyPassphrase}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  px-2 py-1 focus:outline-none"
            />
          </div>
        </form>
        </div>

              <div className="flex items-center space-x-2 mt-2 gap-1">
                <input
                  type="text"
                  className="border rounded px-4 py-2 h-10 focus:outline-none"
                  placeholder="Name of Signature"
                  value={signName || ''}
                  onChange={handleSignatureInput}
                />
                <button
                  onClick={handleSaveSignatureInDB}
                  className="bg-white text-[#283C42] px-4 py-2 rounded border-2 border-[#283C42] hover:bg-[#283C42] hover:text-white hover:border-transparent transition-colors duration-300"
                  >
                  Save Signature
                </button>
              </div>

            </div>
            </div>
      )}
      

      {/* <ToastContainer limit={1}/> */}
      <AllSignatures refreshSignatures={refreshSignatures} setRefreshSignatures={setRefreshSignatures} />
    </div>
  );
}

export default Signature;
