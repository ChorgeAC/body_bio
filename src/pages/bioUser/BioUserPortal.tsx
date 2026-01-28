import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardService } from '../../services';
import { userTypeKey } from '@/constants';

const DASHBOARD_CARDS = [
  { key: 'totalPhysicians', title: 'Total Physicians', color: 'bg-blue-50' },
  { key: 'totalPatients', title: 'Total Patients', color: 'bg-purple-50' },
  { key: 'pendingReports', title: 'Pending Reports', color: 'bg-orange-50' },
] as const;

interface DashboardCounts {
  totalPhysicians: number;
  totalPatients: number;
  pendingReports: number;
}

const BioUserPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract portal name from URL dynamically
  const portalMatch = location.pathname.match(/\/(\w+-portal)/);
  const basePath = portalMatch ? `/${portalMatch[1]}` : '/user-portal';

  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts>({
    totalPhysicians: 640,
    totalPatients: 8746,
    pendingReports: 11,
  });

  const handleCreateUser = (role: string) => {
    navigate(`${basePath}/create-${role}`);
  };

  const handleOnClickPendingReports = (title: string) => {
    if (title === 'Pending Reports') {
      navigate(`${basePath}/pending-reports`);
    }
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
          onClick={() => handleCreateUser(userTypeKey.DOCTOR)}
          className="p-4 rounded-lg bg-blue-100 text-blue-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
        >
          Create New Physician
        </button>
        <button
          onClick={() => handleCreateUser(userTypeKey.PATIENT)}
          className="p-4 rounded-lg bg-orange-50 text-gray-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
        >
          Create New Patient
        </button>
      </div>

      {/* Report Actions */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Report Actions</h3>

      <div className="grid grid-cols-5 gap-4">
        <button
          onClick={() => navigate(`${basePath}/create-new-template`)}
          className="p-4 rounded-lg bg-blue-100 text-blue-700 shadow-sm hover:scale-[1.02] transition cursor-pointer"
        >
          Create New Report Template
        </button>
      </div>
    </div>
  );
};

export default BioUserPortal;
