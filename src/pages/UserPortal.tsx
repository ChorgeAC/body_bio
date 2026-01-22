import { useState, useEffect } from 'react';
import { HomeLayout } from '../components/HomeLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import CommonTable from '../components/CommonTable';
import CreateVisitForm from '../components/CreateVisitForm';
import UploadReportDrawer from '../components/UploadReportDrawer';
import CreateUserForm from '../components/CreateUserForm';
import { patientsList, doctorsList } from '../tests/mockData/SampleDataRecords.json';
import PatientVisitDetailsView from '../components/PatientVisitDetailsView';
import { PendingReportsTable } from '../components/PendingReportsTable';

export interface Doctor {
  id: number;
  name: string;
  email: string;
  speciality: string;
  clinic: string;
  city: string;
  state: string;
  pincode: string;
  tel: string;
  fax: string;
  noOfPatients: number;
  status: string;
}

export interface Patient {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  tel?: string;
  fax?: string;
  status: string;
  pincode?: string;
  state?: string;
  city?: string;
  clinic?: string;
  lastVisit?: string;
}

export type editableUserInfo = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  tel?: string;
  fax?: string;
  status: string;
  pincode?: string;
  state?: string;
  city?: string;
  clinic?: string;
};

const UserPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [editableUserInfo, setEditableUserInfo] = useState<editableUserInfo>();

  const path = location.pathname.split('/').filter(Boolean);
  const currentSection = path[1] || 'dashboard';

  const [active, setActive] = useState(currentSection);

  const [createUserRole, setCreateUserRole] = useState<string | null>(null);

  // -----------------------------
  // CREATE VISIT DRAWER
  // -----------------------------
  const [showCreateVisitDrawer, setShowCreateVisitDrawer] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient>({
    id: 1,
    name: '',
    status: 'active',
  });
  const [showPatientVisitDetailList, setShowPatientVisitDetailList] = useState(false);
  const [showPendingReportsTable, setShowPendingReportsTable] = useState(false);

  const openCreateVisitDrawer = () => {
    setShowCreateVisitDrawer(true);
  };

  const closeCreateVisitDrawer = () => {
    setSelectedPatient({ id: 1, name: '', status: 'active' });
    setShowCreateVisitDrawer(false);
  };

  const handleOnClickPendingReports = () => {
    navigate(`/user-portal/dashboard/pending-reports`);
  };

  // -----------------------------
  // URL Based Routing
  // -----------------------------
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    // Detect Create User URL
    if (parts[1] === 'create-user' || parts[1] === 'edit-user') {
      setCreateUserRole(parts[2]);
      setShowPatientVisitDetailList(false);
      return;
    }

    if (parts[1] === 'doctors' && parts[3] === 'patients') {
      setActive('patients');
      setShowPatientVisitDetailList(false);
      return;
    }

    // upload report (hidden)
    if (parts[1] === 'upload') {
      setCreateUserRole(null);
      setActive('upload');
      setShowPatientVisitDetailList(false);
      return;
    }

    // new-template-report screen (hidden)
    if (parts[1] === 'new-template-report') {
      setCreateUserRole(null);
      setActive('new-template-report');
      setShowPatientVisitDetailList(false);
      return;
    }

    // visit-info
    if (parts[5] === 'visit-info') {
      setShowPatientVisitDetailList(true);
      return;
    }

    // pending verification reports
    if (parts[2] === 'pending-reports') {
      setShowPendingReportsTable(true);
      return;
    }

    setCreateUserRole(null);
    setShowPendingReportsTable(false);
    setActive(parts[1] || 'dashboard');
  }, [location.pathname]);

  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);

    // Doctors → doctorId → patients
    if (parts[1] === 'doctors' && parts[3] === 'patients') {
      const doctorId = parts[2];

      const foundDoctor = doctorsList.find((d) => String(d.id) === doctorId);
      if (foundDoctor) setSelectedDoctor(foundDoctor);

      setCreateUserRole(null);
      setActive('patients');
      return;
    }

    // existing code...
  }, [location.pathname]);

  // -----------------------------
  // MENU
  // -----------------------------
  const menu = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'doctors', label: 'Physicians' },
    // { id: 'patients', label: 'Patients' },
    { id: 'visits', label: 'Visits' },
  ];

  const handleMenuClick = (id: string) => {
    setActive(id);
    navigate(`/user-portal/${id}`);
  };

  const handleCreateUser = (role: string) => {
    navigate(`/user-portal/create-user/${role}`);
  };

  const handleEditUser = (userInfo: editableUserInfo, role: string) => {
    navigate(`/user-portal/edit-user/${role}`);
    setEditableUserInfo(userInfo);
  };

  // -----------------------------
  // RENDER SECTIONS
  // -----------------------------
  const renderSection = () => {
    // -----------------------------
    // CREATE USER MODE
    // -----------------------------
    if (createUserRole) {
      return (
        <CreateUserForm
          role={createUserRole}
          onBack={() => navigate('/user-portal/dashboard')}
          editableUserInfo={editableUserInfo}
        />
      );
    }

    if (showPatientVisitDetailList) {
      return (
        <PatientVisitDetailsView
          onBack={() => navigate(`/user-portal/doctors/${selectedDoctor?.id}/patients`)}
        />
      );
    }

    if (showPendingReportsTable) {
      return <PendingReportsTable />;
    }

    switch (active) {
      // -----------------------------
      // DASHBOARD WITH BUTTONS
      // -----------------------------
      case 'dashboard':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Dashboard</h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-blue-50 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Reports Uploaded</p>
                <h3 className="text-3xl font-bold text-gray-700 mt-2">42</h3>
              </div>

              <div className="p-6 bg-green-50 rounded-xl shadow-sm">
                <p className="text-gray-500 text-sm">Reports Updated</p>
                <h3 className="text-3xl font-bold text-gray-700 mt-2">19</h3>
              </div>

              <div
                className="p-6 bg-orange-50 rounded-xl shadow-sm cursor-pointer"
                onClick={handleOnClickPendingReports}
              >
                <p className="text-gray-500 text-sm">Pending Reports</p>
                <h3 className="text-3xl font-bold text-gray-700 mt-2">7</h3>
              </div>
            </div>

            {/* Quick Actions */}
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>

            <div className="grid grid-cols-5 gap-4 mb-12">
              <button
                onClick={() => handleCreateUser('doctor')}
                className="p-4 rounded-lg bg-blue-100 text-blue-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
              >
                Create Doctor User
              </button>

              <button
                onClick={() => handleCreateUser('patient')}
                className="p-4 rounded-lg bg-green-100 text-green-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
              >
                Create Patient User
              </button>
            </div>

            {/* Report Actions */}
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Report Actions</h3>

            <div className="grid grid-cols-5 gap-4">
              <button
                onClick={() => navigate('/user-portal/upload')}
                className="p-4 rounded-lg bg-green-100 text-green-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
              >
                Upload Report
              </button>
            </div>
          </div>
        );

      // -----------------------------
      // PATIENTS
      // -----------------------------
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
                onEdit={(userInfo) => handleEditUser(userInfo, 'patient')}
                onCreateVisit={openCreateVisitDrawer}
                onSelect={(userInfo) =>
                  navigate(
                    `/user-portal/doctors/${selectedDoctor?.id}/patient/${userInfo.id}/visit-info`
                  )
                }
              />
            </div>
          </div>
        );

      // -----------------------------
      // DOCTORS
      // -----------------------------
      case 'doctors':
        return (
          <CommonTable
            title="Physicians"
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'speciality', label: 'Speciality' },
              { key: 'status', label: 'Status' },
            ]}
            data={doctorsList}
            onSelect={(row: Doctor) => {
              setSelectedDoctor(row);
              navigate(`/user-portal/doctors/${row.id}/patients`);
            }}
            onEdit={(userInfo) => handleEditUser(userInfo, 'doctor')}
            onDelete={(row: Doctor) => alert(`Delete ${row.name}`)}
          />
        );

      // -----------------------------
      // VISITS
      // -----------------------------
      case 'visits':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Visits</h2>

            <div className="space-y-4">
              {[
                { patient: 'Rishi', date: '11 Jan 2025' },
                { patient: 'Ananya', date: '09 Jan 2025' },
              ].map((v, i) => (
                <div
                  key={i}
                  className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer"
                >
                  <p className="font-medium text-gray-700">{v.patient}</p>
                  <p className="text-xs text-gray-600">{v.date}</p>
                </div>
              ))}
            </div>
          </div>
        );

      // -----------------------------
      // UPLOAD
      // -----------------------------
      case 'upload':
        return <UploadReportDrawer />;

      default:
        return null;
    }
  };

  return (
    <HomeLayout>
      <div className="flex grow bg-gray-100 min-h-0">
        {/* SIDEBAR */}
        <aside className="w-1/5 bg-white shadow-sm border-r p-6">
          <ul className="space-y-3">
            {menu.map((item) => (
              <li
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`p-3 rounded-lg cursor-pointer transition
                  ${
                    active === item.id
                      ? 'bg-green-100 text-green-900'
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

      {/* CREATE VISIT DRAWER */}
      {showCreateVisitDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => closeCreateVisitDrawer()} />
          <div className="w-[420px] bg-white h-full shadow-xl p-6 overflow-y-auto">
            <CreateVisitForm
              patient={selectedPatient}
              onClose={closeCreateVisitDrawer}
              onSuccess={() => navigate('/user-portal/upload')}
            />
          </div>
        </div>
      )}
    </HomeLayout>
  );
};

export default UserPortal;
