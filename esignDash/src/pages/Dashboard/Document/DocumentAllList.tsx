import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../redux/selectors/userSelector';
import { ToastContainer, toast ,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DocumentList {
  name: string;
  document_title: string;
  template_title: string;
  owner_email: string;
  document_created_at: string;
}

interface ApiResponse {
  status: number;
  message: {
    data: DocumentList[];
  };
}

interface AllTempletesProps {
  refreshTempletes: boolean;
  setRefreshTempletes: Dispatch<SetStateAction<boolean>>;
}

interface ApiDeleteResponse {
  message: {
    status: number;
    message: string;
  };
}

const DocumentAllList: React.FC<AllTempletesProps> = ({ refreshTempletes, setRefreshTempletes }) => {
  const email = useSelector(selectEmail);
  const [documents, setDocuments] = useState<DocumentList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
       const handleEdit = (document:DocumentList) => {
         navigate(`/document/${document.name}`, { state: { document } }); 
       };

  useEffect(() => {
    console.log("Inside useEffect");
    const fetchTempletes = async () => {
      try {
        const response = await fetch(`/api/method/esign_app.api.get_documents_list?user_mail=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result: ApiResponse = await response.json();
        console.log("Trigger API all list",result);

        if (response.status === 200) {
          if (result.message.data.length > 0) {
            setDocuments(result.message.data);
            setLoading(false);
          } else {
            setError('No documents found');
            setLoading(false);
          }
        } else {
          setError('Failed to fetch documents');
          setLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching documents');
        setLoading(false);
      }
    };

    if (email || refreshTempletes) {
      fetchTempletes();
    }
  }, [email, refreshTempletes]);

  const handleDelete = async (name: string) => {
    try {
      const response = await fetch(`/api/method/esign_app.api.delete_esign_document?user_mail=${email}&name=${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: ApiDeleteResponse = await response.json();
      console.log('Delete Template API Response:', result);

      if (result.message.status === 200) {
        setDocuments(documents.filter(document => document.name !== name));
        setRefreshTempletes(true);
        deleted();
      } else {
        console.error('Failed to delete template:', result.message);
        setError('Failed to delete template');
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      setError('Error deleting template');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  function deleted()
        {
          toast.error('DocumentList Deleted successfully', {
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
      
  return (  
    <div className="relative mt-6 min-w-[1000px] max-w-[1000px] mx-auto">
      <div className="flex flex-wrap gap-5">
      {documents.map((document, index) => (
        <div key={index} className="relative flex w-[200px]">
          <div className="absolute top-2 right-2 cursor-pointer" onClick={() => handleDelete(document.name)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 text-red-600">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6l-2 14H7L5 6"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
              <path d="M18 4l-1-1h-8L7 4"></path>
            </svg>
          </div>
          <div className="bg-[#283C42] text-white rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300 cursor-pointer p-4"
               style={{ width: '350px', height: '100px' }}
               onClick={() => handleEdit(document)}>
            <h3 className=" font-bold">{document.document_title}</h3>
            <h4 className=" font-bold text-xs">{document.template_title}</h4>
            <p className="text-sm text-gray-500">{new Date(document.document_created_at).toLocaleString()}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default DocumentAllList;
