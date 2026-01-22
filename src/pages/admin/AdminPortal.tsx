import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeLayout } from '../../components/HomeLayout';
import CreateUserForm from '../../components/CreateUserForm';
import CommonTable from '../../components/CommonTable';
import CreateVisitForm from '../../components/CreateVisitForm';
import UploadReportDrawer from '../../components/UploadReportDrawer';
import {
  patientsList,
  doctorsList,
  adminsList,
  bioUsersList,
} from '../../tests/mockData/SampleDataRecords.json';
import CreateNewTemplate from '../../components/CreateNewTemplate';
import PatientVisitDetailsView from '../../components/PatientVisitDetailsView';
import { PendingReportsTable } from '../../components/PendingReportsTable';
import { Doctor, editableUserInfo, Patient } from '../UserPortal';
import { DashboardService, PatientService } from '../../services';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'admin-users', label: 'Admin Users' },
  { id: 'bio-users', label: 'Bio Cell Users' },
  { id: 'doctors', label: 'Physicians' },
  // { id: 'patients', label: 'Patients' },
];

const DASHBOARD_CARDS = [
  { key: 'totalPhysicians', title: 'Total Physicians', color: 'bg-blue-50' },
  { key: 'bioCellUsers', title: 'Bio Cell Users', color: 'bg-green-50' },
  { key: 'totalPatients', title: 'Total Patients', color: 'bg-purple-50' },
  { key: 'pendingReports', title: 'Pending Reports', color: 'bg-orange-50' },
] as const;

interface DashboardCounts {
  totalPhysicians: number;
  bioCellUsers: number;
  totalPatients: number;
  pendingReports: number;
}

const AdminPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const [creatingRole, setCreatingRole] = useState<string | null>(null);
  const [editableUserInfo, setEditableUserInfo] = useState<editableUserInfo>();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showPatientVisitDetailList, setShowPatientVisitDetailList] = useState(false);
  const [showPendingReportsTable, setShowPendingReportsTable] = useState(false);
  const [patientData, setPatientData] = useState<Patient[]>(patientsList);

  // -----------------------------
  // CREATE VISIT DRAWER STATE
  // -----------------------------
  const [showCreateVisitDrawer, setShowCreateVisitDrawer] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient>({
    id: 1,
    name: '',
    status: 'active',
  });
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts>({
    totalPhysicians: 640,
    bioCellUsers: 2,
    totalPatients: 8746,
    pendingReports: 11,
  });

  const openCreateVisitDrawer = () => {
    setShowCreateVisitDrawer(true);
  };

  const handleEditUser = (userInfo: editableUserInfo, role: string) => {
    navigate(`/admin-portal/edit-user/${role}`);
    setEditableUserInfo(userInfo);
  };

  const handleCreateUser = (role: string) => {
    if (role === 'bio-cell-user') {
      return navigate(`/admin-portal/create-user`);
    } else {
      navigate(`/admin-portal/create-user/${role}`);
    }
  };

  const handleOnClickPendingReports = (title: string) => {
    if (title === 'Pending Reports') navigate(`/admin-portal/pending-reports`);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await DashboardService.getDashboardDetails();

        setDashboardCounts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  // const renderContent = () => {
  //   if (creatingRole) {
  //     return (
  //       <CreateUserForm
  //         role={creatingRole}
  //         onBack={() => navigate('/admin-portal/dashboard')}
  //         editableUserInfo={editableUserInfo}
  //       />
  //     );
  //   }

  //   if (showPatientVisitDetailList) {
  //     return <PatientVisitDetailsView onBack={() => navigate(-1)} />;
  //   }

  //   if (showPendingReportsTable) {
  //     return <PendingReportsTable />;
  //   }

  //   switch (activeSection) {
  //     // ---------------- DASHBOARD ----------------
  //     case 'dashboard':
  //       return (
  //         <div className="bg-white rounded-xl shadow-sm p-8">
  //           <h2 className="text-2xl font-semibold text-blue-600 mb-8">Dashboard</h2>

  //           {/* TOP CARDS */}
  //           <div className="grid grid-cols-4 gap-6 mb-12">
  //             {DASHBOARD_CARDS.map((c) => (
  //               <div
  //                 key={c.key}
  //                 className={`p-5 rounded-xl shadow-sm ${c.color} cursor-pointer`}
  //                 onClick={() => handleOnClickPendingReports(c.title)}
  //               >
  //                 <p className="text-gray-500 text-sm">{c.title}</p>
  //                 <h3 className="text-3xl font-bold text-gray-700 mt-2">
  //                   {dashboardCounts[c.key]}
  //                 </h3>
  //               </div>
  //             ))}
  //           </div>

  //           {/* QUICK ACTIONS */}
  //           <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>

  //           <div className="grid grid-cols-5 gap-4 mb-12">
  //             <button
  //               onClick={() => handleCreateUser('doctor')}
  //               className="p-4 rounded-lg bg-blue-100 text-blue-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
  //             >
  //               Create New Physician
  //             </button>

  //             <button
  //               onClick={() => handleCreateUser('bio-cell-user')}
  //               className="p-4 rounded-lg bg-green-100 text-green-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
  //             >
  //               Create New Bio Cell User
  //             </button>

  //             <button
  //               onClick={() => handleCreateUser('bio-cell-admin')}
  //               className="p-4 rounded-lg bg-purple-100 text-purple-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
  //             >
  //               Create New Admin
  //             </button>
  //             <button
  //               onClick={() => handleCreateUser('patient')}
  //               className="p-4 rounded-lg bg-orange-50 text-gray-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
  //             >
  //               Create New Patient
  //             </button>
  //           </div>

  //           {/* Report Actions */}
  //           <h3 className="text-lg font-semibold text-gray-700 mb-4">Report Actions</h3>

  //           <div className="grid grid-cols-5 gap-4">
  //             <button
  //               onClick={() => navigate('/admin-portal/new-template-report')}
  //               className="p-4 rounded-lg bg-blue-100 text-blue-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
  //             >
  //               Create New Report Template
  //             </button>

  //             {/* <button
  //               onClick={() => navigate('/admin-portal/upload')}
  //               className="p-4 rounded-lg bg-green-100 text-green-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
  //             >
  //               Upload Report
  //             </button> */}
  //           </div>
  //         </div>
  //       );

  //     case 'new-template-report':
  //       return <CreateNewTemplate />;

  //     // ---------------- DOCTORS ----------------
  //     case 'doctors':
  //       return (
  //         <CommonTable
  //           title="Physicians"
  //           columns={[
  //             { key: 'name', label: 'Name' },
  //             { key: 'email', label: 'Email' },
  //             { key: 'speciality', label: 'Speciality' },
  //             { key: 'status', label: 'Status' },
  //           ]}
  //           data={doctorsList}
  //           onEdit={(userInfo) => handleEditUser(userInfo, 'doctor')}
  //           onDelete={(userInfo) => alert(`Delete ${userInfo.name}`)}
  //           onSelect={(userInfo) => navigate(`/admin-portal/doctors/${userInfo.id}/patients`)}
  //         />
  //       );

  //     // ---------------- PATIENTS (WITH CREATE VISIT) ----------------
  //     case 'patients':
  //       return (
  //         <div className="flex flex-col h-full">
  //           {selectedDoctor && (
  //             <div className="bg-white p-4 rounded-lg shadow-sm mb-3 sticky top-0 z-10">
  //               <div className="font-semibold text-lg text-gray-800">
  //                 {selectedDoctor.name} — {selectedDoctor.speciality}
  //               </div>
  //               <div className="text-sm text-gray-600">17815 Ventura Blvd, Encino, CA, 91316</div>
  //               <div className="text-sm text-gray-500 flex gap-3 mt-1">
  //                 <span>Tel: 818-345-8721</span>
  //                 <span>Fax: 818-345-7150</span>
  //                 <span className="cursor-pointer hover:text-blue-600">
  //                   Email: ILONA_ABRAHAM_MD@HOTMAIL.COM
  //                 </span>
  //               </div>
  //             </div>
  //           )}
  //           <div className="flex-1 overflow-auto">
  //             <CommonTable
  //               title={'Patients'}
  //               columns={[
  //                 { key: 'name', label: 'Name' },
  //                 { key: 'email', label: 'Email' },
  //                 { key: 'lastVisit', label: 'Last Visit' },
  //                 { key: 'status', label: 'Status' },
  //               ]}
  //               data={patientData}
  //               onEdit={(userInfo) => handleEditUser(userInfo, 'patient')}
  //               onCreateVisit={() => openCreateVisitDrawer()}
  //               onSelect={(userInfo) =>
  //                 navigate(
  //                   `/admin-portal/doctors/${selectedDoctor?.id}/patient/${userInfo.id}/visit-info`
  //                 )
  //               }
  //             />
  //           </div>
  //         </div>
  //       );

  //     // ---------------- ADMIN USERS ----------------
  //     case 'admin-users':
  //       return (
  //         <CommonTable
  //           title="Admin Users"
  //           columns={[
  //             { key: 'name', label: 'Name' },
  //             { key: 'email', label: 'Email' },
  //             { key: 'status', label: 'Status' },
  //           ]}
  //           data={adminsList}
  //           onEdit={(userInfo) => handleEditUser(userInfo, 'admin-users')}
  //           onDelete={(userInfo) => alert(`Delete ${userInfo.name}`)}
  //         />
  //       );

  //     // ---------------- BIO USERS ----------------
  //     case 'bio-users':
  //       return (
  //         <CommonTable
  //           title="Bio Cell Users"
  //           columns={[
  //             { key: 'name', label: 'Name' },
  //             { key: 'email', label: 'Email' },
  //             { key: 'status', label: 'Status' },
  //           ]}
  //           data={bioUsersList}
  //           onEdit={(userInfo) => handleEditUser(userInfo, 'bio-users')}
  //           onDelete={(row) => alert(`Delete ${row.name}`)}
  //         />
  //       );

  //     case 'upload':
  //       return <UploadReportDrawer />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-blue-600 mb-8">Dashboard</h2>

      {/* TOP CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        {DASHBOARD_CARDS.map((c) => (
          <div
            key={c.key}
            className={`p-5 rounded-xl shadow-sm ${c.color} cursor-pointer`}
            onClick={() => handleOnClickPendingReports(c.title)}
          >
            <p className="text-gray-500 text-sm">{c.title}</p>
            <h3 className="text-3xl font-bold text-gray-700 mt-2">{dashboardCounts[c.key]}</h3>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-5 gap-4 mb-12">
        <button
          onClick={() => handleCreateUser('doctor')}
          className="p-4 rounded-lg bg-blue-100 text-blue-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
        >
          Create New Physician
        </button>

        <button
          onClick={() => handleCreateUser('bio-cell-user')}
          className="p-4 rounded-lg bg-green-100 text-green-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
        >
          Create New Bio Cell User
        </button>

        <button
          onClick={() => handleCreateUser('bio-cell-admin')}
          className="p-4 rounded-lg bg-purple-100 text-purple-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
        >
          Create New Admin
        </button>
        <button
          onClick={() => handleCreateUser('patient')}
          className="p-4 rounded-lg bg-orange-50 text-gray-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
        >
          Create New Patient
        </button>
      </div>

      {/* Report Actions */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Report Actions</h3>

      <div className="grid grid-cols-5 gap-4">
        <button
          onClick={() => navigate('/admin-portal/create-new-template')}
          className="p-4 rounded-lg bg-blue-100 text-blue-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
        >
          Create New Report Template
        </button>
      </div>
    </div>
  );
};

export default AdminPortal;
