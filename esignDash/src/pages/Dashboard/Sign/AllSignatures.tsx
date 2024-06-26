import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../redux/selectors/userSelector';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Signature List</h1>
      <ul>
        {signatures.map((signature, index) => (
          <li key={index}>
            <h3>{signature.sign_name}</h3>
            <p>Name: {signature.name}</p>
            <p>User: {signature.user_name} ({signature.user_mail})</p>
            <p>Creation Date: {new Date(signature.creation).toLocaleString()}</p>
            <img src={signature.sign_blob} alt={`Signature ${index}`} style={{ maxWidth: '200px' }} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllSignatures;
