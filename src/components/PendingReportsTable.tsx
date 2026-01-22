import { useNavigate } from 'react-router-dom';
import { reports } from '../tests/mockData/SampleDataRecords.json';

const visitId = 1385986;

export const PendingReportsTable = () => {
  const navigate = useNavigate();

  const renderStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <button
            className="
              bg-green-100 text-green-700
              px-3 py-1 rounded-md text-xs font-semibold
              hover:bg-green-200 transition cursor-pointer
            "
            onClick={() => navigate(`preview/${visitId}`)}
          >
            View Report
          </button>
        );

      case 'in-progress':
        return (
          <span
            className="
              text-amber-700 bg-amber-100
              px-2 py-0.5 rounded-md text-xs font-semibold
            "
          >
            In Progress
          </span>
        );

      default:
        return <span className="text-gray-400 font-medium cursor-default">{status}</span>;
    }
  };

  return (
    <div className="w-full  bg-white rounded-xl shadow-sm">
      {/* Title Block */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go Back"
            className="text-blue-600 hover:text-blue-700 transition cursor-pointer -ml-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h2 className="text-base font-semibold text-gray-800">Pending Verification Reports</h2>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          View status of extracted reports & verification workflow
        </p>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wide">
        <div>Report ID</div>
        <div>Report Name</div>
        <div>Patient</div>
        <div>Doctor</div>
        <div>Status</div>
        <div>Created</div>
      </div>

      {/* Table Rows */}
      <div>
        {reports.map((report) => (
          <div
            key={report.id}
            className="
              grid grid-cols-6 gap-4 px-6 py-4 items-center
              hover:bg-gray-50 transition
              border-b border-gray-50
            "
          >
            <div className="text-gray-700 font-medium text-sm">{report.id}</div>
            <div className="text-gray-700 text-sm">{report.name}</div>
            <div className="text-gray-700 text-sm">{report.patientName}</div>
            <div className="text-gray-700 text-sm">{report.doctorName}</div>
            <div>{renderStatus(report.status)}</div>
            <div className="text-gray-500 text-sm">{report.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
