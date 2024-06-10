// src/components/DocumentDetails.js

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Designer from '../PDFEditor/Designer'
function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const document = useSelector(state => state.esign_document.documents.find(doc => doc.id === id));

  if (!document) {
    return <p>Document not found</p>;
  }

  return (
  <>
  <div>
    <div className="relative p-6 bg-[#283C42] text-white border-2 border-transparent hover:border-[#283C42] transition-colors duration-300">
      <button
        className="absolute top-2 right-2 bg-[#551116] text-white px-5 py-1 rounded border-2 border-transparent hover:border-[#551116] hover:bg-white hover:text-[#551116] transition-colors duration-300"
        onClick={() => navigate(-1)}
        >
        Back
      </button>
      <h1 className="text-2xl font-bold">{document.documentName}</h1>
      <p>Email: {document.email}</p>
      <p>Created At: {document.createdAt}</p>
    </div>
    {/* PDF code */}
    <div>

    {/* <Designer/> */}
    </div>    
    
  </div>
  </>
  );
}

export default DocumentDetails;
