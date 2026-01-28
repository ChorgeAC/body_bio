import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardService } from '../../services';

const DASHBOARD_CARDS = [
  { key: 'totalPatients', title: 'Total Patients', color: 'bg-purple-50' },
  { key: 'pendingReports', title: 'Pending Reports', color: 'bg-orange-50' },
] as const;

interface DashboardCounts {
  totalPatients: number;
  pendingReports: number;
}

const DoctorPortal = () => {
  const navigate = useNavigate();
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts>({
    totalPatients: 8746,
    pendingReports: 11,
  });

  const handleOnClickPendingReports = (title: string) => {
    if (title === 'Pending Reports') {
      navigate('/doctor-portal/pending-reports');
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
    </div>
  );
};

export default DoctorPortal;
