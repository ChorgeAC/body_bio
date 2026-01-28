import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeLayout } from '../components/HomeLayout';
import CommonTable from '../components/CommonTable';
import { patientsList, doctorsList } from '../tests/mockData/SampleDataRecords.json';
import PatientVisitDetailsView from '../components/PatientVisitDetailsView';

const selectedDoctor = doctorsList[0];

const DoctorPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentSection = location.pathname.split('/').pop();
  const [active, setActive] = useState(currentSection || 'dashboard');
  const [showPatientVisitDetailList, setShowPatientVisitDetailList] = useState(false);

  useEffect(() => {
    setActive(currentSection || 'dashboard');
  }, [currentSection]);

  const menu = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'patients', label: 'Patients' },
    { id: 'visits', label: 'Visits' },
    { id: 'reports', label: 'Reports' },
  ];

  const handleMenuClick = (id: string) => {
    setActive(id);
    navigate(`/doctor-portal/${id}`);
  };

  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);

    // visit-info
    if (parts[3] === 'visit-info') {
      setShowPatientVisitDetailList(true);
      return;
    } else {
      setShowPatientVisitDetailList(false);
      return;
    }

    setActive(parts[1] || 'dashboard');
  }, [location.pathname]);

  const renderSection = () => {
    if (showPatientVisitDetailList) {
      return <PatientVisitDetailsView />;
    }

    switch (active) {
      // ----------------------------------------------------
      // dashboard
      // ----------------------------------------------------
      case 'dashboard':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Dashboard</h2>

            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Total Patients</p>
                <h3 className="text-3xl font-bold text-gray-700 mt-2">54</h3>
              </div>

              <div className="p-6 bg-green-50 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Reports Submitted</p>
                <h3 className="text-3xl font-bold text-gray-700 mt-2">128</h3>
              </div>

              <div className="p-6 bg-purple-50 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Pending Reports</p>
                <h3 className="text-3xl font-bold text-gray-700 mt-2">9</h3>
              </div>
            </div>
          </div>
        );

      // ----------------------------------------------------
      // PATIENTS TABLE + CREATE VISIT BUTTON
      // ----------------------------------------------------
      case 'patients':
        return (
          <div className="flex flex-col h-full">
            {selectedDoctor && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-3 sticky top-0 z-10">
                <div className="font-semibold text-lg text-gray-800">
                  {selectedDoctor.name} — {selectedDoctor.speciality}
                </div>
                <div className="text-sm text-gray-600">17815 Ventura Blvd, Encino, CA, 91316</div>
                <div className="text-sm text-gray-500 flex gap-3 mt-1">
                  <span>Tel: 818-345-8721</span>
                  <span>Fax: 818-345-7150</span>
                  <span className="cursor-pointer hover:text-blue-600">
                    Email: ILONA_ABRAHAM_MD@HOTMAIL.COM
                  </span>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-auto">
              <CommonTable
                title={'Patients'}
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'lastVisit', label: 'Last Visit' },
                  { key: 'status', label: 'Status' },
                ]}
                data={patientsList}
                onSelect={(userInfo) =>
                  navigate(`/doctor-portal/patients/${userInfo.id}/visit-info`)
                }
              />
            </div>
          </div>
        );

      // ----------------------------------------------------
      // VISITS
      // ----------------------------------------------------
      case 'visits':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Visit History</h2>

            <div className="space-y-4">
              {[
                { id: 1, name: 'Ethan Walker', email: 'ethan@gmail.com', lastVisit: '10 Jan 2025' },
                {
                  id: 2,
                  name: 'Olivia Harris',
                  email: 'olivia@gmail.com',
                  lastVisit: '14 Jan 2025',
                },
                { id: 3, name: 'Jacob Miller', email: 'jacob@gmail.com', lastVisit: '12 Jan 2025' },
                {
                  id: 4,
                  name: 'Sophia Turner',
                  email: 'sophia@gmail.com',
                  lastVisit: '15 Jan 2025',
                },
                { id: 5, name: 'Liam Robinson', email: 'liam@gmail.com', lastVisit: '09 Jan 2025' },
                { id: 6, name: 'Ava Bennett', email: 'ava@gmail.com', lastVisit: '11 Jan 2025' },
                { id: 7, name: 'Mason Clark', email: 'mason@gmail.com', lastVisit: '13 Jan 2025' },
                { id: 8, name: 'Emma Collins', email: 'emma@gmail.com', lastVisit: '08 Jan 2025' },
                { id: 9, name: 'Noah Mitchell', email: 'noah@gmail.com', lastVisit: '16 Jan 2025' },
                { id: 10, name: 'Chloe Adams', email: 'chloe@gmail.com', lastVisit: '07 Jan 2025' },
              ].map((v, i) => (
                <div
                  key={i}
                  className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition cursor-pointer"
                >
                  <p className="font-medium text-blue-900">{v.name}</p>
                  <p className="text-xs text-gray-600">Visited on {v.lastVisit}</p>
                </div>
              ))}
            </div>
          </div>
        );

      // ----------------------------------------------------
      // REPORTS
      // ----------------------------------------------------
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-purple-600 mb-6">Lab Reports</h2>

            <div className="grid grid-cols-2 gap-4">
              {['Blood Test', 'Liver Panel', 'Iron Study', 'Thyroid Panel'].map((report, i) => (
                <div
                  key={i}
                  className="p-5 bg-purple-50 rounded-lg shadow-sm hover:bg-purple-100 transition cursor-pointer"
                >
                  <p className="font-medium text-purple-900">{report}</p>
                  <p className="text-xs text-gray-600">Click to View</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <HomeLayout>
      <div className="flex grow bg-gray-100 min-h-0">
        {/* SIDEBAR */}
        <aside className="w-1/5 bg-white shadow-sm p-6">
          <ul className="space-y-3">
            {menu.map((item) => (
              <li
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`p-3 rounded-lg cursor-pointer transition 
                  ${
                    active === item.id
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* CONTENT */}
        <main className="grow p-8 overflow-y-auto">{renderSection()}</main>
      </div>
    </HomeLayout>
  );
};

export default DoctorPortal;
