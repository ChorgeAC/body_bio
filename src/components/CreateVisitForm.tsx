import React, { useState } from 'react';
import { Patient } from '../pages/UserPortal';
import UploadReportDrawer from './UploadReportDrawer';

export interface Visit {
  id: number;
  patientId: number;
  visitRequest: string;
  visitAccession: string;
  testType: string;
  labType: string;
}

interface CreateVisitFormProps {
  patient: Patient;
  onClose: () => void;
}

const CreateVisitForm: React.FC<CreateVisitFormProps> = ({ patient, onClose }) => {
  const [isDrawerShown, setIsDrawerShown] = useState(false);
  const [form, setForm] = useState({
    visitRequest: '',
    visitAccession: '',
    testType: 'blood-test',
    labType: '1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.visitRequest || !form.visitAccession || !form.testType) {
      alert('Please fill all fields');
      return;
    }

    const newVisitId = Math.floor(Math.random() * 10000); // Number, not object

    // 🔹 MOCK API CALL
    const newVisit = {
      id: Math.floor(Math.random() * 10000),
      patientId: patient.id,
      ...form,
    };

    console.log('Visit Created:', newVisit);
    setIsDrawerShown(true);
    // onSuccess && onSuccess(newVisit);
    // onClose(newVisitId);
  };

  return isDrawerShown ? (
    <UploadReportDrawer />
  ) : (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-600">Create Visit</h2>
        <p className="text-sm text-gray-500">Patient: {patient.name}</p>
      </div>

      {/* FORM */}
      <div className="space-y-5 flex-1">
        <div>
          <label className="text-sm text-gray-600">Visit Request No.</label>
          <input
            type="number"
            name="visitRequest"
            value={form.visitRequest}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Visit Accession No.</label>
          <input
            type="number"
            name="visitAccession"
            value={form.visitAccession}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Test Type</label>
          <select
            name="testType"
            value={form.testType}
            onChange={handleChange}
            className="mt-1 w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-2"
          >
            <option value="blood-test">Blood Test</option>
            <option value="fatty-acid">Fatty Acid</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Lab</label>
          <select
            name="LabType"
            value={form.labType}
            onChange={handleChange}
            className="cursor-pointer mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2"
          >
            <option value="1">Kennedy Frigger Lab</option>
            <option value="2">LS-Horse Ranges</option>
            <option value="3">Life Science</option>
            <option value="4">HDL-Fatty Acid</option>
          </select>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="pt-6 border-t flex justify-end gap-3">
        <button
          onClick={() => onClose()}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          Create & Upload Report
        </button>
      </div>
    </div>
  );
};

export default CreateVisitForm;
