import { doctorsList, patientsList } from '../tests/mockData/SampleDataRecords.json';
interface PatientVisitDetailsViewProps {
  onBack: () => void;
}

const PatientVisitDetailsView = ({ onBack }: PatientVisitDetailsViewProps) => {
  const visits = [
    {
      id: 1,
      approved: true,
      date: '01/10/2025',
      accession: 'A1234',
      request: 'REQ001',
      testId: 'BLOOD01',
      entered: '01/11/2025',
      by: 'Admin',
      canceled: false,
    },
    {
      id: 2,
      approved: false,
      date: '01/05/2025',
      accession: 'A1236',
      request: 'REQ002',
      testId: 'FATTY01',
      entered: '01/06/2025',
      by: 'Admin',
      canceled: false,
    },
    {
      id: 3,
      approved: true,
      date: '12/20/2024',
      accession: 'A1255',
      request: 'REQ003',
      testId: 'BLOOD02',
      entered: '12/21/2024',
      by: 'Admin',
      canceled: false,
    },
    {
      id: 4,
      approved: true,
      date: '12/01/2024',
      accession: 'A1290',
      request: 'REQ004',
      testId: 'FATTY02',
      entered: '12/02/2024',
      by: 'Admin',
      canceled: false,
    },
    {
      id: 5,
      approved: false,
      date: '11/28/2024',
      accession: 'A1300',
      request: 'REQ005',
      testId: 'BLOOD03',
      entered: '11/29/2024',
      by: 'Admin',
      canceled: true,
    },
  ];

  const selectedDoctor = doctorsList[4];
  const selectedPatient = patientsList[4];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4 min-h-full">
      {/* Back Button */}
      <button
        onClick={() => onBack()}
        className="flex items-center gap-2 text-blue-600 font-medium
          hover:text-blue-700 transition cursor-pointer select-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Patients</span>
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">Visit History</h2>

      {/* Combined Doctor & Patient Section */}
      <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-start shadow-sm sticky top-0 z-10">
        {/* Doctor Info */}
        {selectedDoctor && (
          <div className="flex-1 pr-4">
            <div className="text-gray-800 font-semibold text-lg truncate">
              {selectedDoctor.name} — {selectedDoctor.speciality}
            </div>
            <div className="text-gray-600 text-sm truncate">{selectedDoctor.clinic}</div>
            <div className="flex flex-wrap gap-2 text-gray-500 text-sm mt-1">
              <span>Tel: {selectedDoctor.tel}</span>
              <span>Fax: {selectedDoctor.fax}</span>
              <span className="cursor-pointer hover:text-blue-600 truncate">
                Email: {selectedDoctor.email}
              </span>
            </div>
          </div>
        )}

        {/* Patient Info */}
        {selectedPatient && (
          <div className="flex-1 text-right pl-4">
            <div className="text-gray-800 font-semibold text-lg truncate">
              {selectedPatient.name}
            </div>
            <div className="text-gray-600 text-sm">Last Visit: {selectedPatient.lastVisit}</div>
            <div className="flex flex-wrap gap-2 justify-end text-gray-500 text-sm mt-1">
              <span>Phone: {selectedPatient.phone}</span>
              <span>Email: {selectedPatient.email}</span>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden bg-gray-50">
        <div className="overflow-y-auto max-h-[420px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-sm">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Approved</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Date</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Accession</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Request</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Test ID</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Entered</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">By</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Canceled</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((v) => (
                <tr
                  key={v.id}
                  className="cursor-pointer bg-white hover:bg-blue-50 transition border-b border-gray-100"
                >
                  <td className="px-3 py-2 text-gray-700">{v.approved ? 'Yes' : 'No'}</td>
                  <td className="px-3 py-2 text-gray-700">{v.date}</td>
                  <td className="px-3 py-2 text-gray-700">{v.accession}</td>
                  <td className="px-3 py-2 text-gray-700">{v.request}</td>
                  <td className="px-3 py-2 text-gray-700">{v.testId}</td>
                  <td className="px-3 py-2 text-gray-700">{v.entered}</td>
                  <td className="px-3 py-2 text-gray-700">{v.by}</td>
                  <td className="px-3 py-2 text-gray-700">{v.canceled ? 'Yes' : 'No'}</td>
                </tr>
              ))}

              {!visits.length && (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-gray-500 italic">
                    No visits available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientVisitDetailsView;
