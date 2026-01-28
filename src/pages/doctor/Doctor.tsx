import CommonTable from '@/components/CommonTable';
import { doctorsList } from '../../tests/mockData/SampleDataRecords.json';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Doctor as DoctorProps } from '@/services/doctor.service';
import { DoctorService } from '@/services/doctor.service';
import { userTypeKey } from '@/constants';

const Doctor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract portal name from URL dynamically
  const portalMatch = location.pathname.match(/\/(\w+-portal)/);
  const basePath = portalMatch ? `/${portalMatch[1]}` : '/admin-portal';

  const handleEditUser = (id: number, role: string) => {
    navigate(`${basePath}/edit-${role}/${id}`);
  };

  const [doctorListData, setDoctorListData] = useState<DoctorProps[]>(doctorsList);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await DoctorService.getDoctorList({});
        setDoctorListData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctor();
  }, []);

  return (
    <div>
      <CommonTable
        title="Physicians"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'speciality', label: 'Speciality' },
          { key: 'status', label: 'Status' },
        ]}
        data={doctorListData}
        onEdit={(userInfo) => handleEditUser(userInfo.id, userTypeKey.DOCTOR)}
        // onDelete={(userInfo) => alert(`Delete ${userInfo.name}`)}
        onSelect={(userInfo) => navigate(`${basePath}/doctor/${userInfo.id}/patients`)}
      />
    </div>
  );
};

export default Doctor;
