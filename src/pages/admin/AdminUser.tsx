import CommonTable from '@/components/CommonTable';
import { adminsList } from '../../tests/mockData/SampleDataRecords.json';
import { useNavigate } from 'react-router-dom';
import { userTypeKey } from '@/constants';

const AdminUser = () => {
  const navigate = useNavigate();
  const handleEditUser = (role: string): void => {
    navigate(`/admin-portal/create-${role}`);
  };

  return (
    <div>
      <CommonTable
        title="Admin Users"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'status', label: 'Status' },
        ]}
        data={adminsList}
        onEdit={() => handleEditUser(userTypeKey.ADMIN)}
        // onDelete={(userInfo) => alert(`Delete ${userInfo.name}`)}
      />
    </div>
  );
};

export default AdminUser;
