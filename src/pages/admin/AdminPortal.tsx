import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardService } from '../../services';

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
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts>({
    totalPhysicians: 640,
    bioCellUsers: 2,
    totalPatients: 8746,
    pendingReports: 11,
  });

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
