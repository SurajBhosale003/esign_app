import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../redux/selectors/userSelector';
import { DeleteOutlined,ArrowLeftOutlined,ArrowRightOutlined } from '@ant-design/icons';
import { Card } from 'antd';

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

function AllSignatures() {
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
        console.log('API Response:', result);

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

    if (email) {
      fetchSignatures();
    }
  }, [email]);

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
      <div 
        className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide" 
        ref={scrollContainerRef}
      >
        {signatures.map((signature, index) => (
          <div key={index} className="inline-block">
            <Card
              style={{ width: 300 }}
              cover={<img className='mt-10 h-30' alt={`Signature ${index}`} src={signature.sign_blob} />}
              actions={[<DeleteOutlined key="delete" />]}
            >
              {/* <Meta title={signature.sign_name} description={signature.name} /> */}
              <Meta title={signature.sign_name} description={new Date(signature.creation).toLocaleString()} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllSignatures;



// mapp function 
{/* {signatures.map((signature, index) => (
          <li key={index}>
            <h3>{signature.sign_name}</h3>
            <p>Name: {signature.name}</p>
            <p>User: {signature.user_name} ({signature.user_mail})</p>
            <p>Creation Date: {new Date(signature.creation).toLocaleString()}</p>
            <img src={signature.sign_blob} alt={`Signature ${index}`} style={{ maxWidth: '200px' }} />
          </li>
        ))} */}