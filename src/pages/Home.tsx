import React, { useState } from 'react';
import BiomarkerManager from '../components/BiomakerManager';

const BasicLayout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'patients', label: 'Patients' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'reports', label: 'Reports' },
  ];

  // --------- CONTENT RENDERING BASED ON ACTIVE SECTION ---------
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-2xl shadow">
                <p className="text-gray-500 text-sm">Total Patients</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">128</h3>
              </div>

              <div className="p-6 bg-green-50 rounded-2xl shadow">
                <p className="text-gray-500 text-sm">Today's Appointments</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">16</h3>
              </div>

              <div className="p-6 bg-purple-50 rounded-2xl shadow">
                <p className="text-gray-500 text-sm">Pending Reports</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-2">9</h3>
              </div>
            </div>
          </div>
        );

      case 'patients':
        return (
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-green-600 mb-8">Patients List</h2>

            <ul className="space-y-4">
              {['Amit Kumar', 'Priya Singh', 'Rahul Verma', 'Sneha Gupta'].map((p, i) => (
                <li
                  key={i}
                  className="p-5 bg-gray-50 rounded-xl border shadow hover:shadow-lg transition cursor-pointer"
                >
                  <p className="font-semibold text-gray-800">{p}</p>
                  <p className="text-sm text-gray-500">Last visited: 12 Jan 2025</p>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'appointments':
        return (
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Appointments</h2>

            <div className="space-y-4">
              {[
                { name: 'Amit Kumar', time: '10:00 AM' },
                { name: 'Riya Mehta', time: '11:30 AM' },
                { name: 'Vikas Sharma', time: '01:00 PM' },
              ].map((a, i) => (
                <div key={i} className="p-5 bg-blue-50 rounded-xl border shadow hover:shadow-lg">
                  <p className="font-semibold text-gray-800">{a.name}</p>
                  <p className="text-sm text-gray-600">Time: {a.time}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <BiomarkerManager />
          // <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200">
          //   <h2 className="text-2xl font-bold text-purple-600 mb-6">Reports Center</h2>

          //   <div className="grid grid-cols-2 gap-6">
          //     {['Blood Test', 'X-ray Chest', 'MRI Scan', 'Urine Test', 'ECG Report'].map(
          //       (report, i) => (
          //         <div
          //           key={i}
          //           className="p-6 bg-purple-50 rounded-xl border shadow hover:shadow-lg transition"
          //         >
          //           <p className="font-semibold text-gray-800">{report}</p>
          //           <p className="text-sm text-gray-600">Updated: 10 Jan 2025</p>
          //         </div>
          //       )
          //     )}
          //   </div>
          // </div>
        );

      default:
        return null;
    }
  };

  // --------- MAIN LAYOUT ---------
  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-[#eef3f8] to-[#f8fafc]">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-10 bg-white shadow-md border-b ">
        <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide">Body Bio</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-gray-700">Dr. Jagrati</p>
            <p className="text-xs text-gray-500">Neurosurgeon</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold shadow-inner">
            DS
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex grow overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white border-r shadow-xl p-6">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`p-4 rounded-xl cursor-pointer text-sm font-semibold transition 
                shadow ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg scale-[1.02]'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-10 overflow-y-auto">{renderContent()}</main>
      </div>

      {/* Footer */}
      <footer className="h-16 bg-white border-t flex items-center justify-center text-sm text-gray-500 shadow-md">
        © 2025 Body Bio · All rights reserved
      </footer>
    </div>
  );
};

export const Home = () => <BasicLayout />;
