import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../redux/selectors/userSelector';
import { DeleteOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Meta } = Card;

interface Signature {
  name: string;
  sign_blob: string;
  sign_name: string;
  user_mail: string;
  user_name: string;
  creation: string;
}

interface ApiResponse {
  status: number;
  message: {
    data: Signature[];
  };
}

interface AllSignaturesProps {
  refreshSignatures: boolean;
  setRefreshSignatures: Dispatch<SetStateAction<boolean>>;
}

interface ApiDeleteResponse {
  message: {
    status: number;
    message: string;
  }
}

const AllSignatures: React.FC<AllSignaturesProps> = ({ refreshSignatures, setRefreshSignatures }) => {
  const email = useSelector(selectEmail);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await fetch(`/api/method/esign_app.api.get_signatures?user_mail=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const result: ApiResponse = await response.json();
        // // console.log('API Response:', result);
  
        if (response.status === 200) {
          setSignatures(result.message.data);
          setLoading(false);
        } else {
          setError(result.message.data.toString());
          setLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching signatures');
        setLoading(false);
      }
    };
  
    if (email || refreshSignatures) { 
      fetchSignatures();
    }
  }, [email, refreshSignatures]); // Added refreshSignatures to dependency array

  function deleted() {
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

  function errorMSG() {
    toast.error('Failed to delete signature', {
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

  const handleDelete = async (name: string) => {
    try {
      const response = await fetch(`/api/method/esign_app.api.cancel_and_delete_esignature?user_mail=${email}&name=${name}`, {
        method: 'POST', // or 'DELETE'
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: ApiDeleteResponse = await response.json();
      // // console.log('Delete API Response:', result);

      if (result.message.status === 200) {
        deleted();
        setSignatures(signatures.filter(sig => sig.name !== name));
        setRefreshSignatures(true); // Trigger refresh after successful delete
      } else {
        errorMSG();
        console.error('Failed to delete signature:', result.message);
      }
    } catch (error) {
      errorMSG();
      console.error('Error deleting signature:', error);
    }
  };


  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
      const newScrollLeft = direction === 'left'
        ? Math.max(scrollLeft - clientWidth, 0)
        : Math.min(scrollLeft + clientWidth, scrollWidth - clientWidth);

      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative mt-6 min-w-[1000px] max-w-[1000px] mx-auto pl-10 pr-10">
      {signatures.length >= 3 && (
        <>
          <button
            className="scroll-button left absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-2 cursor-pointer z-10"
            onClick={() => scroll('left')}
          >
            <ArrowLeftOutlined />
          </button>
          <button
            className="scroll-button right absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-2 cursor-pointer z-10"
            onClick={() => scroll('right')}
          >
            <ArrowRightOutlined />
          </button>
        </>
      )}
      <div
        className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
        ref={scrollContainerRef}
      >
        {signatures.map((signature, index) => (
          <div key={index} className="inline-block">
            <Card
              style={{ width: 300 }}
              cover={<img className='mt-10 h-30' alt={`Signature ${index}`} src={signature.sign_blob} />}
              actions={[
                <DeleteOutlined key="delete" onClick={() => handleDelete(signature.name)} />
              ]}
            >
              <Meta title={signature.sign_name} description={new Date(signature.creation).toLocaleString()} />
            </Card>
          </div>
        ))}
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}

export default AllSignatures;
