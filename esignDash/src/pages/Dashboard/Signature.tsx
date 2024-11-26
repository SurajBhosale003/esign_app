import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { KEYUTIL } from 'jsrsasign';
// import { pki } from 'node-forge';
// import forge from 'node-forge';
import SignPad from './Sign/SignPad';
import { selectFullName, selectEmail } from '../../redux/selectors/userSelector';
import AllSignatures from './Sign/AllSignatures';
import 'react-toastify/dist/ReactToastify.css';
import {  toast ,Flip } from 'react-toastify';
import { CertificateSigned } from './helper/SignedCertificate'
// import { validateSelfSignedCertificate , generateSelfSignedCertificate } from './helper/certificateGenerator';

// interface Keys {
//   publicKey: string | null;
//   privateKey: string | null;
//   certificate: CertificateSigned | null;
//   cert_pem : string | null;
// }

function Signature() {
  // const [publicKey, setPublicKey] = useState<string | null>(null);
  // const [privateKey, setPrivateKey] = useState<string | null>(null);
  // const [certificate, setCertificate] = useState<CertificateSigned | null>(null);
  // const [keys,setKeys] = useState<Keys | null>({
  //   publicKey: null,
  //   privateKey: null,
  //   certificate: null,
  //   cert_pem : null,
  // });

  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [signName, setSignName] = useState<string | null>(null);
  const [refreshSignatures, setRefreshSignatures] = useState<boolean>(false); 
  const [formData, setFormData] = useState({
    companyName: '',
    department: '',
    state: '',
    country: '',
  });
  const fullName = useSelector(selectFullName);
  const email = useSelector(selectEmail);

  const handleClearAll = () =>{
    setSignatureData(null);
    setUploadedImage(null);
    setSignName(null);

  }
  // useEffect(() => {
  //   console.log("use effect for keys ran");
  
  //   if (!keys?.publicKey) return;  
  //   handleSaveSignatureInDB();
  // }, [keys]);
  

  // const generateKeys = async () => {
  //   try {
  //     console.log('Generating RSA keys...');
  //     const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
  //     const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
  //     const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
  //     console.log('After RSA keys...');
  //     const cert = forge.pki.createCertificate();
  //     cert.publicKey = publicKey;
  //     cert.serialNumber = String(Date.now()); 
  //     cert.validFrom = new Date();
  //     cert.validTo = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  //     cert.setSubject([
  //       { name: 'commonName', value: fullName },
  //       { name: 'organizationName', value: formData.companyName },
  //       { name: 'countryName', value: formData.country },
  //       { name: 'emailAddress', value: email },
  //       { name: 'stateOrProvinceName', value: formData.state }
  //     ]);
  //     const sha256 = forge.md.sha256.create();
  //     cert.sign(privateKey, sha256);

  //     const certPem = forge.pki.certificateToPem(cert);
  //     console.log('Certificate PEM:', certPem);
  //     // Set use State values 
  //     console.log("\n Public",publicKeyPem,"\n Private" , privateKeyPem);
      
  //     // await setCertificate(cert);
  //     // await setPublicKey(publicKeyPem);
  //     // await setPrivateKey(privateKeyPem);
  //     setKeys({ publicKey: publicKeyPem, privateKey: privateKeyPem, certificate: cert , cert_pem : certPem });


  //     console.log('Certificate generated successfully!');
      
  //   } catch (error) {
  //     console.error('Error generating keys:', error);
  //   }
  // };

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
      // public_key : keys?.publicKey,
      // private_key : keys?.privateKey,
      // selfSigned_cert : JSON.stringify(keys?.certificate),
      // cert_pem : keys?.cert_pem,
    };
    // console.log(signatureObject)
    // console.log(formData)
    // console.log('public key :',keys?keys.publicKey:null);
    // console.log('private key :',keys?keys.privateKey:null)
    // console.log('Certificates :',keys?keys.certificate:null)

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
