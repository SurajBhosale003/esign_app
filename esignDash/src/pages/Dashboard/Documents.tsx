import  { useState } from 'react';
import { ToastContainer, toast ,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { addDocument, deleteDocument  } from '../../redux/reducers/documentReducerSlice';
import { Modal, Input } from 'antd';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Documents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documents = useSelector(state => state.esign_document.documents);
  const [visible, setVisible] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [email, setEmail] = useState('');

  function customError(msg){
    toast.error('Error:'+msg, {
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
  function error()
  {
    toast.error('Document name & email cannot be blank', {
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
  function deleted()
  {
    toast.error('Deleted successfully', {
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
  function success()
  {
    toast.success('Document Created Successfully', {
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
  function resetFields()
  {
    setVisible(false);
    setDocumentName('');
    setEmail('');
  }
  const handleAddDocument = () => {
    console.log('Doc'+documentName +'Email: '+email);
    if (documentName==''  || email =='') {
      error();
      return;
    }
    try{
      dispatch(addDocument({ documentName, email }));
      success();
      resetFields();
    }catch(e){
      resetFields();
    }
  };
  const handleDeleteDocument = (id) => {
    try{
      dispatch(deleteDocument(id));
      deleted();
    }catch(e){ 
      customError(e);
    }
  };

  return (
    <>
      <div className="mb-5">
        <button
          onClick={() => setVisible(true)} // Open the modal on button click
          className=" mt-2 mr-2 bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300"
        >
          Create Document
        </button>
      </div>
      <div>
     

   
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {documents.map((document) => (
          <div key={document.id} className="relative">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={() => handleDeleteDocument(document.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 text-red-600">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-2 14H7L5 6"></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                  <path d="M18 4l-1-1h-8L7 4"></path>
                </svg>
              </div>
            <div className="bg-[#283C42] text-white rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300 cursor-pointer" style={{ width: '350px', height: '120px' }}  
            onClick={() => navigate(`/document/${document.id}`)}>
              
              
              <div className="p-4">
                <h2 className="font-bold overflow-hidden whitespace-nowrap">{document.documentName}</h2>
                <p className="overflow-hidden whitespace-nowrap">Email: {document.email}</p>
                <p className="overflow-hidden whitespace-nowrap">Created At: {document.createdAt}</p>
              </div>
            </div>
          </div>
      ))}

      </div>
      </div>
      
      <Modal
        title="Create Document"
        open={visible}
        onCancel={() => setVisible(false)} // Close the modal
        footer={[
          <button className="bg-[#551116] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#551116] hover:bg-white hover:text-[#551116] transition-colors duration-300 m-2" key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </button>,
         <button
         key="submit"
         onClick={handleAddDocument}
         className="bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300"
       >
         Create
       </button>,
        ]}
      >
        <Input
        className='bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none m-2'
          placeholder="Document Name"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <Input
          placeholder="Email"
          className='bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none m-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
      <ToastContainer
      limit={1}
      />
    </>
  );
}

export default Documents;

// card 2nd Style 
//  <div key={document.id} className="mt-10">
//     <div className="notification">
//     <div className="notiglow"></div>
//     <div className="notiborderglow"></div>
//     <div className="notititle"><h2><b> {document.documentName} </b></h2></div>
//     <div className="notibody"><p>Email: {document.email}<br/> <p>Created At: {document.createdAt}</p> </p></div>
//     </div>
// </div>