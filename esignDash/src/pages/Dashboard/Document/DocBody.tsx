
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
interface DocumentList {
  name: string;
  document_title: string;
  template_title: string;
  owner_email: string;
  document_created_at: string;
}
function DocumentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { document } = location.state as { document?: DocumentList } || {};
    if (!document) {
      console.log("Data State",document);
      return <p>Document not found</p>;
    }

  return (
    <>
      <div>
        <div className="relative p-2 bg-[#283C42] text-white border-2 border-transparent hover:border-[#283C42] transition-colors duration-300">
          <button
            className="absolute top-2 right-2 bg-[#551116] text-white px-5 py-1 rounded border-2 border-transparent hover:border-[#551116] hover:bg-white hover:text-[#551116] transition-colors duration-300"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <h1 className="text-lg font-bold">{document.document_title}</h1>
          <p className='text-sm'>{document.template_title}</p>
          <p className='text-sm'>Email: {document.owner_email}</p>
          <p className='text-sm'>Created At: {document.document_created_at}</p>
        </div>  
        <div className='document-main-drag-class'>

        </div>
      </div>
    </>
  );
}

export default DocumentDetails;
