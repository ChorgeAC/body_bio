import CommonTable from '@/components/CommonTable';
import { patientsList } from '../../tests/mockData/SampleDataRecords.json';
import { editableUserInfo } from '../UserPortal';
import { useNavigate } from 'react-router-dom';

const GetDoctorDetails = () => {
  const navigate = useNavigate();
  const handleEditUser = (userInfo: editableUserInfo, role: string) =>
    navigate(`/admin-portal/edit-user/${role}`);

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
            data={patientsList}
            onEdit={(userInfo) => handleEditUser(userInfo, 'patient')}
            // onCreateVisit={() => openCreateVisitDrawer()}
            // onSelect={(userInfo) =>
            //   navigate(
            //     `/admin-portal/doctors/${selectedDoctor?.id}/patient/${userInfo.id}/visit-info`
            //   )
            // }
          />
        </div>
      </div>
    </div>
  );
};

export default GetDoctorDetails;
