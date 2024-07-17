import { useState, Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { selectFullName, selectEmail } from '../../../redux/selectors/userSelector';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Flip } from 'react-toastify';

interface TempleteAddProps {
  setRefreshTempletes: Dispatch<SetStateAction<boolean>>;
}

const TempleteAdd: React.FC<TempleteAddProps> = ({ setRefreshTempletes }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [templeteName, setTempleteName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fullName = useSelector(selectFullName);
  const email = useSelector(selectEmail);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTempleteName(null);
    setErrorMessage(null); // Clear error message on modal close
  };

  const cancelModal = () => {
    setModalVisible(false);
    setTempleteName(null);
    setErrorMessage(null); // Clear error message on modal cancel
  };

  const handleTempleteNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempleteName(e.target.value);
    if (errorMessage) {
      setErrorMessage(null); // Clear error message on input change
    }
  };

  const saveTemplete = async () => {
    if (!templeteName) {
      setErrorMessage("No value provided for templete name");
    } else if (templeteName.length < 4) {
      setErrorMessage("Enter a name with more than 4 characters");
    } else {
      const templeteObject = {
        templete_name: templeteName,
        user_full_name: fullName,
        user_email: email,
      };

      try {
        const response = await fetch('/api/method/esign_app.api.save_templete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(templeteObject),
        });

        const result = await response.json();
        console.log(result);
        if (result.message.status < 300) {
          toast.success('Templete Created Successfully', {
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
          setTempleteName(null);
          setModalVisible(false);
          setRefreshTempletes((prev: boolean) => !prev); // Trigger refresh
        } else {
          toast.error('Error while saving templete', {
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
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the templete');
      }
    }
  };

  return (
    <>
      <div>
        <button
          className="bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300"
          onClick={showModal}
        >
          Add Templete
        </button>
      </div>
      <Modal
        title="Add Templete"
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          <div key="footer-buttons" className="flex gap-2">
            <button
              key="save-button"
              onClick={saveTemplete}
              className="bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300"
            >
              Save
            </button>
            <button
              key="cancel-button"
              className="bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#ca2424] hover:bg-white hover:text-[#ca2424] transition-colors duration-300"
              onClick={cancelModal}
            >
              Cancel
            </button>
          </div>
        ]}
      >
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Templete Name</label>
          <input
            className="bg-[#d1e0e4] text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="text"
            value={templeteName || ""}
            onChange={handleTempleteNameInput}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
      </Modal>
      <ToastContainer limit={1} />
    </>
  );
}

export default TempleteAdd;
