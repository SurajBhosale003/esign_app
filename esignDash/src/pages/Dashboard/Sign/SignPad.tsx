import React, { useRef, useState } from 'react';
import { Modal, Button, Tabs } from 'antd';
import SignatureCanvas from 'react-signature-canvas';

interface SignatureProps {
  onSave: (dataUrl: string) => void;
  onUpload: (imageUrl: string) => void;
  
}

const { TabPane } = Tabs;

const SignPad: React.FC<SignatureProps> = ({ onSave, onUpload }) => {
  const signatureRef = useRef<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleSave = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.toDataURL();
      onSave(dataUrl);
      setModalVisible(false);
    }
  };

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setUploadedImage(imageDataUrl);
        onUpload(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
    closeModal();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setUploadedImage(imageDataUrl);
        onUpload(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div>
        <button className="bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300" onClick={showModal}>Add Signature</button>
      </div>

      <Modal
        title="Draw Your Signature"
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          ,
        ]}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Draw Signature" key="1">
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{ width: 470, height: 200, className: 'sigCanvas' }}
            />
            <Button key="clear" onClick={handleClear}>
            Clear Signature
          </Button>
          <Button key="save" type="primary" onClick={handleSave}>
            Save Signature
          </Button>
          </TabPane>
          <TabPane tab="Upload Signature" key="2">
            <div
              className="w-full h-80 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-400 rounded-lg"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                Drag & Drop or Click to Upload
              </label>
            </div>
            {/* {uploadedImage && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Uploaded Image Preview</h2>
                <img
                  src={uploadedImage}
                  alt="Uploaded Image"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  className="border border-gray-300 rounded"
                />
              </div>
            )} */}
             {/* <Button key="clear" onClick={}>
                Clear Uploaded Signature
            </Button>
            <Button key="clear" onClick={}>
                Add Signature
            </Button> */}
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default SignPad;