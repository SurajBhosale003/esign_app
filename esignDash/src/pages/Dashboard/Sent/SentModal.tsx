import React from 'react';
import { Modal } from 'antd';
import dayjs from '../helper/dayjsConfig';

// Define the status classes
const getStatusClasses = (status: string) => {
  switch (status) {
    case 'Unread':
      return 'bg-red-100 text-red-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    default:
      return '';
  }
};

const SentModal: React.FC<{ modalContent: any; isModalVisible: boolean; handleModalCancel: () => void }> = ({ modalContent, isModalVisible, handleModalCancel }) => {
  // Get the status classes based on the modalContent
  const statusClasses = getStatusClasses(modalContent?.status);

  return (
    <Modal
    //   title={modalContent?.documentTitle}
      visible={isModalVisible}
      onCancel={handleModalCancel}
      footer={null}
      className={`text-gray-700`}
    >
    <div className='mt-4'>
      <p className={`mb-2 text-xl text-gray-400`}>
        {modalContent?.subject}
      </p>
      <p className={`mb-4 ${statusClasses} inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium`}>
        {modalContent?.status}
      </p>
      <div className="mb-4">
        <p className="mb-2">
          <strong>Description:</strong>
        </p>
        <p className={`text-justify `}>
          {modalContent?.description}
        </p>
      </div>
      <p className="mt-4">
        <strong>Timestamp:</strong> {dayjs(modalContent?.timestamp).format('DD/MM/YYYY')} ({dayjs(modalContent?.timestamp).fromNow()})
      </p>
    </div>
    </Modal>
  );
};

export default SentModal;
