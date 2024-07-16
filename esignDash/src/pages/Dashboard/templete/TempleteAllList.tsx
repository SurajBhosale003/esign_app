import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../redux/selectors/userSelector';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Templete {
  name: string;
  templete_title: string;
  templete_owner_email: string;
  templete_owner_name: string;
  templete_created_at: string;
}

interface ApiResponse {
  status: number;
  message: {
    data: Templete[];
  };
}

interface AllTempletesProps {
  refreshTempletes: boolean;
  setRefreshTempletes: Dispatch<SetStateAction<boolean>>;
}

const TempleteAllList: React.FC<AllTempletesProps> = ({ refreshTempletes, setRefreshTempletes }) => {
  const email = useSelector(selectEmail);
  const [templetes, setTempletes] = useState<Templete[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTempletes = async () => {
      try {
        const response = await fetch(`/api/method/esign_app.api.get_templetes?user_mail=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const result: ApiResponse = await response.json();
  
        if (response.status === 200) {
          if (result.message.data.length > 0) {
            setTempletes(result.message.data);
            setLoading(false);
          } else {
            setError('No templates found');
            setLoading(false);
          }
        } else {
          setError('Failed to fetch templates');
          setLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching templates');
        setLoading(false);
      }
    };
  
    if (email || refreshTempletes) {
      fetchTempletes();
    }
  }, [email, refreshTempletes]);

  function showErrorToast(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative mt-6 min-w-[1000px] max-w-[1000px] mx-auto pl-10 pr-10">
      <div className="flex flex-wrap gap-4">
        {templetes.map((templete, index) => (
          <div key={index} className="w-1/4 p-4 border rounded shadow-md">
            <h3 className="text-lg font-bold">{templete.templete_title}</h3>
            <p className="text-sm text-gray-500">{new Date(templete.templete_created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}

export default TempleteAllList;
