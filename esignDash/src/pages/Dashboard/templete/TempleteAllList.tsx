import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../redux/selectors/userSelector';

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

interface ApiDeleteResponse {
  message: {
    status: number;
    message: string;
  }
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

  const handleDelete = async (name: string) => {
    try {
      const response = await fetch(`/api/method/esign_app.api.delete_esign_templete?user_mail=${email}&name=${name}`, {
        method: 'POST', // Assuming the endpoint supports POST for deletion
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: ApiDeleteResponse = await response.json();
      console.log('Delete Template API Response:', result);

      if (result.message.status === 200) {
        setTempletes(templetes.filter(templete => templete.name !== name));
        setRefreshTempletes(true);
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

  return (
    <div className="relative mt-6 min-w-[1000px] max-w-[1000px] mx-auto pl-10 pr-10">
      <div className="flex flex-wrap gap-5">
        {templetes.map((templete, index) => (
          <>
          <div key={index} className="w-1/5 p-4 border rounded shadow-md flex hover:shadow-lg hover:scale-100 transition duration-300 ease-in-out">
          <div className='transition duration-300 ease-in-out'>
            <h3 className="text-lg font-bold">{templete.templete_title}</h3>
            <p className="text-sm text-gray-500">{new Date(templete.templete_created_at).toLocaleString()}</p>
          </div>
           <svg
            onClick={() => handleDelete(templete.name)}
            className='mt-3 cursor-pointer fill-current text-[#283C42] hover:text-red-500 transition-colors duration-300'
            width="40px"
            height="40px"
            viewBox="0 -5 32 32"
            version="1.1"
          >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Icon-Set" transform="translate(-516.000000, -1144.000000)" className="fill-current">
                <path d="M538.708,1151.28 C538.314,1150.89 537.676,1150.89 537.281,1151.28 L534.981,1153.58 L532.742,1151.34 C532.352,1150.95 531.718,1150.95 531.327,1151.34 C530.936,1151.73 530.936,1152.37 531.327,1152.76 L533.566,1154.99 L531.298,1157.26 C530.904,1157.65 530.904,1158.29 531.298,1158.69 C531.692,1159.08 532.331,1159.08 532.725,1158.69 L534.993,1156.42 L537.232,1158.66 C537.623,1159.05 538.257,1159.05 538.647,1158.66 C539.039,1158.27 539.039,1157.63 538.647,1157.24 L536.408,1155.01 L538.708,1152.71 C539.103,1152.31 539.103,1151.68 538.708,1151.28 L538.708,1151.28 Z M545.998,1162 C545.998,1163.1 545.102,1164 543.996,1164 L526.467,1164 L518.316,1154.98 L526.438,1146 L543.996,1146 C545.102,1146 545.998,1146.9 545.998,1148 L545.998,1162 L545.998,1162 Z M543.996,1144 L526.051,1144 C525.771,1143.98 525.485,1144.07 525.271,1144.28 L516.285,1154.22 C516.074,1154.43 515.983,1154.71 515.998,1154.98 C515.983,1155.26 516.074,1155.54 516.285,1155.75 L525.271,1165.69 C525.467,1165.88 525.723,1165.98 525.979,1165.98 L525.979,1166 L543.996,1166 C546.207,1166 548,1164.21 548,1162 L548,1148 C548,1145.79 546.207,1144 543.996,1144 L543.996,1144 Z" id="delete">
                </path>
              </g>
            </g>
          </svg>
            {/* <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(templete.name)}>Delete</button> */}
          </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default TempleteAllList;
