import CommonTable from '@/components/CommonTable';
import { bioUsersList } from '../../tests/mockData/SampleDataRecords.json';
import { editableUserInfo } from '../UserPortal';
import { useNavigate } from 'react-router-dom';

const BioUser = () => {
  const navigate = useNavigate();
  const handleEditUser = (userInfo: editableUserInfo, role: string) =>
    navigate(`/admin-portal/edit-user/${role}`);
  return (
    <div>
      <CommonTable
        title="Bio Cell Users"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'status', label: 'Status' },
        ]}
        data={bioUsersList}
        onEdit={(userInfo) => handleEditUser(userInfo, 'bio-users')}
        onDelete={(row) => alert(`Delete ${row.name}`)}
      />
    </div>
  );
};

export default BioUser;
