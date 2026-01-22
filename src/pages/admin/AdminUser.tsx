import CommonTable from '@/components/CommonTable';
import { adminsList } from '../../tests/mockData/SampleDataRecords.json';
import { useNavigate } from 'react-router-dom';
import { editableUserInfo } from '../UserPortal';

const AdminUser = () => {
  const navigate = useNavigate();
  const handleEditUser = (userInfo: editableUserInfo, role: string) =>
    navigate(`/admin-portal/edit-user/${role}`);
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
        onEdit={(userInfo) => handleEditUser(userInfo, 'admin-users')}
        onDelete={(userInfo) => alert(`Delete ${userInfo.name}`)}
      />
    </div>
  );
};

export default AdminUser;
