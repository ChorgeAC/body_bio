import CommonTable from '@/components/CommonTable';
import { bioUsersList } from '../../tests/mockData/SampleDataRecords.json';
import { useNavigate } from 'react-router-dom';
import { userTypeKey } from '@/constants';

const BioUser = () => {
  const navigate = useNavigate();
  const handleEditUser = (role: string) =>
    navigate(`/admin-portal/create-${role}`);
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
        onEdit={() => handleEditUser(userTypeKey.USER)}
        // onDelete={(row) => alert(`Delete ${row.name}`)}
      />
    </div>
  );
};

export default BioUser;
