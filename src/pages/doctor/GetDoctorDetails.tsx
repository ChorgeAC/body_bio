import CommonTable from '@/components/CommonTable';
import { patientsList } from '../../tests/mockData/SampleDataRecords.json';
import { editableUserInfo, Patient } from '../UserPortal';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreateVisitForm from '@/components/CreateVisitForm';
import { PatientService } from '@/services';

const GetDoctorDetails = () => {
  const navigate = useNavigate();
  const [patientListData, setPatientListData] = useState<Patient[]>(patientsList);
  const [showCreateVisitDrawer, setShowCreateVisitDrawer] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient>({
    id: 1,
    name: '',
    status: 'active',
  });
  const openCreateVisitDrawer = (userInfo: editableUserInfo) => {
    setShowCreateVisitDrawer(true);
    setSelectedPatient(userInfo);
  };

  const closeCreateVisitDrawer = () => {
    console.log('foo');
    setShowCreateVisitDrawer(false);
  };
  const handleEditUser = (userInfo: editableUserInfo, role: string) =>
    navigate(`/admin-portal/edit-user/${role}`);

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const data = await PatientService.getPatientList({ patientId: 0 });
        setPatientListData(data);
      } catch (error) {}
    };
    fetchPatientList();
  }, []);

  return (
    <div>
      <div className="flex flex-col h-full">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-3 sticky top-0 z-10">
          <div className="font-semibold text-lg text-gray-800">John Wick</div>
          <div className="text-sm text-gray-600">17815 Ventura Blvd, Encino, CA, 91316</div>
          <div className="text-sm text-gray-500 flex gap-3 mt-1">
            <span>Tel: 818-345-8721</span>
            <span>Fax: 818-345-7150</span>
            <span className="cursor-pointer hover:text-blue-600">
              Email: ILONA_ABRAHAM_MD@HOTMAIL.COM
            </span>
          </div>
        </div>
        <div className="flex-1">
          <CommonTable
            title={'Patients'}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'lastVisit', label: 'Last Visit' },
              { key: 'status', label: 'Status' },
            ]}
            data={patientListData}
            onEdit={(userInfo) => handleEditUser(userInfo, 'patient')}
            onCreateVisit={(userInfo) => openCreateVisitDrawer(userInfo)}
            // onSelect={(userInfo) =>
            //   navigate(
            //     `/admin-portal/doctors/${selectedDoctor?.id}/patient/${userInfo.id}/visit-info`
            //   )
            // }
          />
        </div>
      </div>
      {showCreateVisitDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => closeCreateVisitDrawer()} />
          <div className="w-[420px] bg-white h-full shadow-xl p-6 overflow-y-auto">
            <CreateVisitForm patient={selectedPatient} onClose={() => closeCreateVisitDrawer()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetDoctorDetails;
