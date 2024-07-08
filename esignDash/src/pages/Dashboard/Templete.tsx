import React, { useState, useEffect, useRef } from 'react';
import { splitPDF } from './PdfLibOwn/GetPages';
import { pdfToBase64 } from './PdfLibOwn/PDFtoBase64';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.js';

function Templete() {
  const [base64PDF, setBase64PDF] = useState<string | null>(null);
  const [pages, setPages] = useState<Array<{ page: number; data: string }> | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(0.65);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (pages) {
      renderPage(pages[currentPage - 1].data, pageRefs.current[currentPage - 1]);
    }
  }, [pages, currentPage, zoomLevel]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64String = await pdfToBase64(file);
      setBase64PDF(base64String);
      const result = await splitPDF(base64String);
      setPages(result);
      setCurrentPage(1);
    }
  };

  const renderPage = async (pageData: string, container: HTMLDivElement | null) => {
    if (container) {
      const pdf = await pdfjsLib.getDocument({ data: atob(pageData) }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: zoomLevel });

      container.innerHTML = '';

      container.style.width = `${viewport.width}px`;
      container.style.height = `${viewport.height}px`;
      container.style.position = 'relative';

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        container.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;

        const borderDiv = document.createElement('div');
        borderDiv.style.position = 'absolute';
        borderDiv.style.top = '0';
        borderDiv.style.left = '0';
        borderDiv.style.width = `${viewport.width}px`;
        borderDiv.style.height = `${viewport.height}px`;
        borderDiv.style.border = '2px solid green';
        container.appendChild(borderDiv);
      }
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (pages && currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const zoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.2);
  };

  const zoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(0.2, prevZoomLevel - 0.2));
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="flex flex-row w-full h-full">
        <div id="editorDivArea" className="flex flex-col items-center justify-center gap-2 p-3 min-w-[100vh] max-w-[100vh] h-full border border-blue-500">
          {!pages && (
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="bg-gray-100 text-[#283C42] border-1 border-[#283C42] px-4 py-2 rounded hover:bg-[#283C42] hover:text-white hover:border-white transition-colors duration-300 mb-4"
              />
            </div>
          )}
          {pages && (
            <>
              <div className="flex flex-row justify-between w-full mb-2 px-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="bg-gray-100 text-[#283C42] border-1 border-[#283C42] px-4 py-2 rounded hover:bg-[#283C42] hover:text-white hover:border-white transition-colors duration-300"
                >
                  Previous
                </button>
                <div className="flex flex-row items-center">
                  <button
                    onClick={zoomOut}
                    className="bg-gray-100 text-[#283C42] border-1 border-[#283C42] px-4 py-2 rounded hover:bg-[#283C42] hover:text-white hover:border-white transition-colors duration-300 mr-2"
                  >
                    Zoom Out
                  </button>
                  <button
                    onClick={zoomIn}
                    className="bg-gray-100 text-[#283C42] border-1 border-[#283C42] px-4 py-2 rounded hover:bg-[#283C42] hover:text-white hover:border-white transition-colors duration-300"
                  >
                    Zoom In
                  </button>
                </div>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === (pages?.length || 0)}
                  className="bg-gray-100 text-[#283C42] border-1 border-[#283C42] px-4 py-2 rounded hover:bg-[#283C42] hover:text-white hover:border-white transition-colors duration-300"
                >
                  Next
                </button>
              </div>
              <div className="w-full h-full overflow-y-auto flex justify-center items-center px-4 py-2">
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className={`page-container ${index + 1 === currentPage ? 'block' : 'hidden'}`}
                    ref={(ref) => (pageRefs.current[index] = ref)}
                  >
                    <div className="pdf-page" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="w-2/5 border flex flex-col">
          <div className="p-2 w-full h-2/5 border min-w-[50vh] border-purple-500">
            {/* Content for the first inner div */}
          </div>
          <div className="w-full h-3/5 border border-yellow-500">
            {/* Content for the second inner div */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templete;
