import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Flip } from 'react-toastify';
// import back canva from "./pdfsb";  
import Moveable from 'react-moveable';
import { MoveableManagerInterface, Renderer } from "react-moveable";
import { PDFDocument, rgb } from 'pdf-lib';
import { useDrag, useDrop, DragSourceMonitor} from 'react-dnd';
// Helper Custom ---
import PdfRenderer from '../helper/pdfsb/PdfRenderer';
import { datapdfDemo } from '../helper/DataPDF'
import { BlankDatapdf } from '../helper/BlankPDF'
import { initialComponents , DexcissTemplete , HelloDexciss } from '../helper/TemplateMaping';
import { ComponentData } from '../helper/Interface'
import { splitPDF } from '../helper/GetPages';
import { pdfToBase64 } from '../helper/PDFtoBase64';
import { ButtonType , buttonConfigs } from '../helper/ButtonUtilities';
import SignInput from '../helper/SignInput';
import './document.css' 
import { extractUniqueElements } from '../helper/extractUniqueElements';

type SelectedComponent = {
  id: number;
  type: ComponentType | string;
  checked:boolean;
  content:any;
} | null;

type ComponentType = "text" | "image";

interface DocumentList {
    name: string;
    document_title: string;
    template_title: string;
    owner_email: string;
    document_created_at: string;
  }

interface BasePDFInterface
{
  page: number;
  data: string;
}

interface DraggableButtonProps {
  type: string;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}



const Signer = () => {
    
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectSignatureData, setSelectSignatureData] = useState<string | null>(null);
  const [datapdf , setdatapdf] = useState<BasePDFInterface[]>(datapdfDemo);
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent>(null);
  const moveableRef = useRef<Moveable | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const [assignedUser , setAssignedUser] = useState<String[]>([])
  const { documentData } = location.state as { documentData?: DocumentList } || {};
  const navigate = useNavigate();
  if (!documentData) {
    console.log("No document data",JSON.stringify(documentData));
    return <p>Document not found</p>;
  }
  useEffect(() => {
    if (selectedId !== null) {
      const component = components.find(c => c.id === selectedId);
      if (component) {
        setSelectedComponent({ id: component.id, type: component.type,checked : component.checked ?? false , content: component.content  });
      } else {
        setSelectedComponent(null);
      }
    }
  }, [selectedId, target, components]);
  useEffect(() => {

    const fetchTemplateData = async () => {
      
      try {
        const response = await fetch(`/api/method/esign_app.api.get_document_components_and_basepdf?document_name=${documentData?documentData.name:''}`);
        const result = await response.json();
        // // // console.log("documentData :" ,JSON.stringify(documentData));
        console.log(result);
        if(result.message.document_json_data == null || result.message.base_pdf_datad == null)
        {
          return ;
        }
        if (result.message.status === 200) {
     
          const parsedData = typeof result.message.document_json_data === 'string'
          ? JSON.parse(result.message.document_json_data)
          : result.message.document_json_data;

          const BasePDFData = typeof result.message.base_pdf_datad === 'string'
          ? JSON.parse(result.message.base_pdf_datad)
          : result.message.base_pdf_datad;

          // // // console.log("Parseeee",parsedData)
          // // // console.log("Baseeee",BasePDFData)
        setComponents(parsedData);
        setdatapdf(BasePDFData);
        } else {

        }
      } catch (error) {

        console.error('Error:', error);
      }
    };

    fetchTemplateData();
    addAssignUser();
  }, []);
  const addAssignUser = () =>{
    const AssignedUsers: string[] = extractUniqueElements(components);
    setAssignedUser(AssignedUsers);
  }
  useEffect(() => {
    addAssignUser();
  },[components])


const handleNextPage = () => {
  if (currentPage < datapdf.length - 1) {
    setCurrentPage(currentPage + 1); setTarget(null); setSelectedId(null);
  }
};

const handlePreviousPage = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1); setTarget(null); setSelectedId(null);
  }
};

const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setUserInput(e.target.value);
};


const handleComponentChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
  const { type, value, files } = e.target;

  setComponents(prevComponents =>
    prevComponents.map(component => {
      if (component.id !== id) return component;

      switch (component.type) {
        case 'text':
          return { ...component, content: value, value };
        case 'image':
        case 'v_image':
          if (files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setComponents(prevComponents =>
                prevComponents.map(c =>
                  c.id === id ? { ...c, content: reader.result as string } : c
                )
              );
            };
            reader.readAsDataURL(files[0]);
          }
          return component;
        case 'checkbox':
          return { ...component, checked: e.target.checked };
        case 'm_date':
        case 'live_date':
        case 'fix_date':
          return { ...component, content: value };
        default:
          return component;
      }
    })
  );
};


const handleSelectSignComp = (SelectedDataUrl: string) => {
  setComponents((prevComponents) =>
    prevComponents.map((component) =>
      component.id === selectedId ? { ...component, content: SelectedDataUrl, value: SelectedDataUrl } : component
    )
  );
  setTarget(null);
  setSelectedId(null);
  setSelectedComponent(null);
  // setSelectSignatureData(SelectedDataUrl);
  // console.log(selectSignatureData,"orrrrr",SelectedDataUrl);
};
const handleModelSignComp = () => {
  setTarget(null);
};

const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, componentId: number) => {
  const isChecked = e.target.checked;
  setComponents((prevComponents) =>
    prevComponents.map((component) =>
      component.id === componentId ? { ...component, checked: isChecked } : component
    )
  );
};
const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, componentId: number) => {
  const newDate = e.target.value;
  setComponents((prevComponents) =>
    prevComponents.map((component) =>
      component.id === componentId ? { ...component, content: newDate, value: newDate } : component
    )
  );
};


const handleDeselect = (e: React.MouseEvent) => {
  if (!(e.target as HTMLElement).closest('.component')) {
    setSelectedId(null);
    setTarget(null);
  }
};

const changeTextSize = (increment: boolean) => {
  if (selectedId !== null) {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === selectedId
          ? {
              ...component,
              fontSize: (component.fontSize || 16) + (increment ? 2 : -2),
            }
          : component
      )
    );
  }
};

const deleteComponent = () => {
  if (selectedId !== null) {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== selectedId)
    );
    setSelectedId(null);
    setTarget(null);
  }
};







// const loadComponents = () => {
//   setComponents(initialComponents);
// };

// const loadDexcissComponents = () => {
//   setComponents(DexcissTemplete);
// };
// const loadHelloDexcissComponents = () => {
//   setComponents(HelloDexciss);
// };

// sel the cmpt, set target , 
useEffect(() => {
  if (selectedId !== null) {
    const selectedElement = document.querySelector(`[data-id="${selectedId}"]`);
    setTarget(selectedElement as HTMLElement);
    const selectedComponent = components.find((c) => c.id === selectedId);
    if (selectedComponent?.type === 'text') {
      setTextFieldValue(selectedComponent.content || '');
      // textInputRef.current?.focus();
    }
  }
}, [selectedId, components]);

useEffect(() => {
  if (selectedId !== null) {
    const component = components.find(c => c.id === selectedId);
    if (component) {
      setSelectedComponent({
        id: component.id,
        type: component.type,
        checked: component.checked || false,
        content: component.content || '',
      });
    } else {
      setSelectedComponent(null);
    }
  }
}, [selectedId, target, components]);


const base64ToUint8Array = (base64:any) => {
  return Uint8Array.from(atob(base64), char => char.charCodeAt(0));
};

const mergeAndPrintPDF = async () => {
  const pdfDoc = await PDFDocument.create(); // Create a new PDF document
  
  for (let i = 0; i < datapdf.length; i++) {
    const pdfBytes = base64ToUint8Array(datapdf[i].data);
    const pdfToMerge = await PDFDocument.load(pdfBytes);

    const pages = await pdfDoc.copyPages(pdfToMerge, pdfToMerge.getPageIndices());
    pages.forEach(page => pdfDoc.addPage(page));
  }

  const componentsByPage: { [key: number]: ComponentData[] } = components.reduce((acc, component) => {
    if (!acc[component.pageNo]) acc[component.pageNo] = [];
    acc[component.pageNo].push(component);
    return acc;
  }, {} as { [key: number]: ComponentData[] });

  const pages = pdfDoc.getPages();
  
  for (const page of pages) {
    const pageIndex = pages.indexOf(page);
    const pageComponents = componentsByPage[pageIndex] || [];

    for (const component of pageComponents) {
      const { left, top } = component.position;

      if (component.type === 'text' || component.type === 'v_text') {
        const fontSize = component.fontSize ?? 12;
        const yPosition = page.getHeight() - top - fontSize - 3;
        page.drawText(component.content || '', {
          x: left + 3,
          y: yPosition,
          size: fontSize,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          maxWidth: component.size?.width ?? 0,
        });
      } else if ((component.type === 'image' || component.type === 'v_image'  || component.type === 'v_signature'  || component.type === 'signature' ) && component.content) {
        const imageData = component.content.split(',')[1];
        if (!imageData) {
          console.error('Invalid image data');
          continue;
        }

        const imageBytes = base64ToUint8Array(imageData);
        let embeddedImage;

        if (component.content.startsWith('data:image/png')) {
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        } else if (component.content.startsWith('data:image/jpeg') || component.content.startsWith('data:image/jpg')) {
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        } else {
          console.error('Unsupported image format');
          continue;
        }

        const { width: imageWidth, height: imageHeight } = embeddedImage;
        const containerWidth = component.size?.width ?? 0;
        const containerHeight = component.size?.height ?? 0;

        const widthRatio = containerWidth / imageWidth;
        const heightRatio = containerHeight / imageHeight;
        const scaleRatio = Math.min(widthRatio, heightRatio);

        const drawWidth = imageWidth * scaleRatio;
        const drawHeight = imageHeight * scaleRatio;

        const x = left;
        const y = page.getHeight() - top - drawHeight;

        page.drawImage(embeddedImage, {
          x: x,
          y: y,
          width: drawWidth,
          height: drawHeight,
        });
      } else if (component.type === 'checkbox') {
        const size = 10; //=================================================================================== CheckBox
        const yPosition = page.getHeight() - top - size - 5;

        if (component.checked) {
          page.drawRectangle({
            x: left + 5,
            y: yPosition,
            width: size,
            height: size,
            color: rgb(0, 0, 0),
          });
        } else {
          page.drawRectangle({
            x: left + 5,
            y: yPosition,
            width: size,
            height: size,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
            color: rgb(1, 1, 1),
          });
        }
      } else if (component.type === 'm_date'||component.type === 'live_date' || component.type === 'fix_date') {
        const fontSize = component.fontSize ?? 12;
        const yPosition = page.getHeight() - top - fontSize - 3;
        const dateValue = component.content || new Date().toLocaleDateString();

        page.drawText(dateValue, {
          x: left + 3,
          y: yPosition,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
 const varName = `esignDoc-${documentData.document_title}`;
  const link = document.createElement('a');
  link.href = url;
  link.download = `${varName}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};





const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, componentId: number) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setComponents(prevComponents =>
        prevComponents.map(component =>
          component.id === componentId
            ? { ...component, content: base64String }
            : component
        )
      );
    };
    reader.readAsDataURL(file);
  }
};



if (!documentData) {
  return <div>No Doc data available</div>;
}
//-------------------------------------------React UI part -------------------------------------------------
return (
    <>
    


<div className="text-xs flex items-center gap-3 relative p-6 bg-[#283C42] text-white border-2 border-transparent hover:border-[#283C42] transition-colors duration-300">
<div>
  <button className="button" onClick={() => navigate(-1)}>
  <div className="button-box">
    <span className="button-elem">
      <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
        ></path>
      </svg>
    </span>
    <span className="button-elem">
      <svg viewBox="0 0 46 40">
        <path
          d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
        ></path>
      </svg>
    </span>
  </div>
</button>
      </div>
  <div>
    <h1 className="text-xl font-bold " style={{ fontVariant: 'small-caps' }}>{documentData.document_title}</h1>
    <p className='text-xs'>{documentData.template_title}</p>
    <p className='text-xs'>Email: {documentData.owner_email}</p>
    <p className='text-xs'>Created At: {documentData.document_created_at}</p>
  </div>
</div>
<div className='templete-main-div-signer'>


  <div className="templete-app text-xs">
      <div className='flex gap-3 mb-2'>
        <button 
          className="bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300"
          onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <h1 className='mt-2'>{currentPage + 1} / {datapdf.length}</h1>
        <button
          className="bg-[#283C42] text-white px-4 py-2 rounded border-2 border-transparent hover:border-[#283C42] hover:bg-white hover:text-[#283C42] transition-colors duration-300"
          onClick={handleNextPage}
          disabled={currentPage === datapdf.length - 1}
        >
          Next
        </button>
      </div>
  <div className="workspace" ref={workspaceRef} onClick={handleDeselect}>
    <PdfRenderer pdfData={datapdf[currentPage].data} />
      {components
    .filter((component) => component.pageNo === currentPage) 
    .map((component) => (
      <div
        key={component.id}
        data-id={component.id}
        className={`component ${component.type} ${selectedId === component.id ? 'selected' : ''}`}
        style={{
          position: 'absolute',
          top: component.position.top,
          left: component.position.left,
          width: component.size?.width ?? 0,
          height: component.size?.height ?? 0,
          border: selectedId === component.id ? '1px solid red' : 'none',
          fontSize: `${component.fontSize}px`,
          userSelect: 'none',
          overflow: 'hidden',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(component.id);
        }}
      >
        {component.type === 'text' && (
      <div
        // contentEditable
        // // onChange={handleTextChange}
        // onInput={() => handleTextChange}
        style={{ width: '100%', height: '100%', overflow: 'hidden', fontSize: 'inherit', outline: 'none' }}
      >
        {component.value || 'Editable Text'}
      </div>
    )}
    {component.type === 'image' && !component.content && (
      // <input
      //   type="file"
      //   accept="image/*"
      //   onChange={(e) => handleComponentChange(e, component.id)}
       
      // />
      <div></div>
    )}
    {component.type === 'v_image' && !component.content && (
      // <input
      //   type="file"
      //   accept="image/*"
      //   onChange={(e) => handleComponentChange(e, component.id)}
      // />
      <div></div>
    )}
    {(component.type === 'image'|| component.type === 'v_image' || component.type === 'signature' || component.type === 'v_signature') && component.content && (
      <img src={component.content} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
    )}
    {component.type === 'checkbox' && (
      <input
        type="checkbox"
        checked={component.checked || false}
        onChange={(e) => handleComponentChange(e, component.id)}
    
      />
    )}
    {component.type === 'm_date' && (
      <input
        type="date"
        value={component.content || ''}
        onChange={(e) => handleComponentChange(e, component.id)}
      />
    )}
    {component.type === 'live_date' && (
      <input
        type="date"
        value={new Date().toISOString().split('T')[0]}
        onChange={(e) => handleComponentChange(e, component.id)}
        // readOnly
        
      />
    )}
    {component.type === 'fix_date' && (
      <input
        type="date"
        value={component.content || ''}
        onChange={(e) => handleComponentChange(e, component.id)}
      />
    )}
    {component.type === 'v_text' && (
      <div>{component.content || 'Editable Text'}</div>
    )}
      </div>
    ))}

      <Moveable
        ref={moveableRef}
        target={target}
        bounds={{
          left: 0,
          top: 0,
          right: workspaceRef.current?.offsetWidth || 0,
          bottom: workspaceRef.current?.offsetHeight || 0,
        }}
   
      />
    </div>
  </div>

</div>
<ToastContainer limit={1} />
    </>
  );
};

export default Signer;
