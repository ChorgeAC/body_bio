import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BiomarkerVariantManager from './BiomarkerVariantManager';

const CreateNewTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const [form, setForm] = useState({
    visitRequest: '',
    visitAccession: '',
    testType: '',
    lab: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isNewTemplate ? (
        <BiomarkerVariantManager setIsNewTemplate={setIsNewTemplate} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lab */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Lab</label>
              <select
                name="lab"
                value={form.lab}
                onChange={handleChange}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled hidden>
                  Select Lab
                </option>
                <option value="1">Kennedy Frigger Lab</option>
                <option value="2">LS-Horse Ranges</option>
                <option value="3">Life Science</option>
                <option value="4">HDL-Fatty Acid</option>
              </select>
            </div>

            {/* Test Type */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Test Type</label>
              <select
                name="testType"
                value={form.testType}
                onChange={handleChange}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled hidden>
                  Select Test Type
                </option>
                <option value="blood-test">Blood Test</option>
                <option value="fatty-acid">Fatty Acid</option>
              </select>
            </div>
          </div>

          {/* PDF Upload */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Upload Template (PDF)
            </label>

            <label
              htmlFor="pdf-upload"
              className="flex flex-col items-center justify-center
                 w-full h-36
                 border-2 border-dashed border-gray-200
                 rounded-xl bg-gray-50
                 cursor-pointer hover:bg-gray-100 transition"
            >
              <span className="text-sm font-medium text-gray-700">Click to upload PDF</span>
              <span className="text-xs text-gray-500 mt-1">Only .pdf files accepted</span>
            </label>

            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />

            {file && (
              <p
                className="mt-3 inline-flex items-center gap-2
                    text-sm text-gray-700
                    bg-gray-100 px-3 py-1.5 rounded-lg"
              >
                📄 {file.name}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700
                 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => setIsNewTemplate(true)}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white
                 hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewTemplate;
