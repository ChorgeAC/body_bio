import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UploadReportDrawer = () => {
  const [file, setFile] = useState<File | null>();
  const navigate = useNavigate();
  const parts = location.pathname.split('/').filter(Boolean);

  const handleUpload = () => {
    if (!file) {
      alert('Please upload a PDF');
      return;
    }
    toast.success("Extraction started — we'll notify once completed.");
    navigate(`/${parts[0]}/dashboard`);
  };

  return (
    <div className="h-full flex flex-col p-8 bg-white">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-10">Upload Lab Report</h2>

      {/* Upload Area */}
      <div className="flex flex-col items-center justify-center flex-1">
        <label
          htmlFor="pdf-upload"
          className="w-full py-14 flex flex-col items-center justify-center 
                     bg-gray-50 rounded-xl 
                     text-gray-600 cursor-pointer hover:bg-gray-100 transition"
        >
          <span className="text-lg mb-1">Click to Upload PDF</span>
          <span className="text-xs text-gray-500">Only .pdf files accepted</span>
        </label>

        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="hidden"
        />

        {file && (
          <p className="mt-6 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
            📄 {file.name}
          </p>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg 
                     hover:bg-gray-200 transition cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow 
                     hover:bg-purple-700 transition cursor-pointer"
        >
          Preview & Extract
        </button>
      </div>
    </div>
  );
};

export default UploadReportDrawer;
