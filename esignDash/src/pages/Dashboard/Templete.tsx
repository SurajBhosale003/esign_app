
function Templete() {
  return (
   <>
    <div className="absolute right-0 lg:w-4/5 sm:w-full h-screen lg:h-9/10 sm:pl-20 lg:pl-0">
      <div className="flex flex-row h-full">
        <div id="editorDivArea" className="gap-2 w-4/5 border border-blue-500 flex justify-center items-center">
          <button className="bg-gray-100 text-[#283C42] border-1 border-[#283C42] px-4 py-2 rounded hover:bg-[#283C42] hover:text-white hover:border-white transition-colors duration-300">Upload PDF</button>
          <button className="bg-gray-100 text-[#283C42] border-1 border-[#283C42] px-4 py-2 rounded hover:bg-[#283C42] hover:text-white hover:border-white transition-colors duration-300">Blank PDF</button>
        </div>

            <div className="w-2/5  border flex flex-col">
              <div className="w-full h-2/5  border border-purple-500">
                {/* Content for the first inner div */}
              </div>
              <div className="w-full h-3/5 border border-yellow-500">
                {/* Content for the second inner div */}
              </div>
            </div>
      </div>
   </div>
   </>
  )
}

export default Templete