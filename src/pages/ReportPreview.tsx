import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AnalysisTable from '../components/AnalysisTable';
import { toast } from 'react-toastify';
// import PdfViewer from '../components/PdfViewer';

const ReportPreview = () => {
  const { visitId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // const file = location.state?.file;
  const file = 'dummy file';

  const handleSaveAndGenerateAnalysis = () => {
    navigate(-2);
    toast.success('Analysis Report has been generated.');
  };

  if (!file) {
    return <p className="text-center mt-10">No PDF selected</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-purple-600 mb-6">
        Report Preview (Visit #28374692)
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* PDF Preview */}
        {/* <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold mb-3">Uploaded PDF</h3>
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <PdfViewer file={file} />
            </div>
          </div>
        </div> */}

        {/* Extracted Data */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold mb-3">Extracted Data</h3>
          <AnalysisTable />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveAndGenerateAnalysis}
          className="px-6 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700"
        >
          Save & Generate Analysis
        </button>
      </div>
    </div>
  );
};

export default ReportPreview;
