import { Modal } from "antd";
import { useState } from "react";

interface SendDocProps {
  owner_email: string;
  assigned_user: String[];  
}

function SendDoc({ owner_email, assigned_user }: SendDocProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const sendDialogHandle = () => {
    console.log(assigned_user)
    setVisible(true);
  };

  return (
    <>
      <button 
        className="bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300"
        onClick={sendDialogHandle}
      >
        Send Document
      </button>   

      <Modal
        title="Send Document"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <p>Owner Email: {owner_email}</p>
        <p>Assigned Users: {assigned_user.join(' | ')}</p>
      </Modal>
    </>
  );
}

export default SendDoc;
