import { useLocation, useNavigate } from 'react-router-dom';
import BodyBioLogo from '../../public/bodyBioLogo.svg';
import { PropsWithChildren } from 'react';

export const HomeLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();

  const findRole = () => {
    if (location.pathname.includes('admin')) {
      return 'Admin';
    } else if (location.pathname.includes('user')) {
      return 'Bio-cell User';
    } else if (location.pathname.includes('doctor')) {
      return 'Doctor';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <>
        {/* HEADER */}
        <header className="h-16 min-h-[64px] flex items-center justify-between px-8 bg-white shadow-sm">
          <img src={BodyBioLogo} alt="BodyBio" />
          <div className="flex items-center gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-700">{`${findRole() === 'Doctor' ? 'Dr.' : ''} William Carter (${findRole()})`}</p>
                {findRole() === 'Doctor' && <p className="text-xs text-gray-500">Cardiology</p>}
              </div>

              <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold shadow-inner">
                AU
              </div>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={() => navigate('/auth/login')}
              className="px-4 cursor-pointer py-1.5 text-sm font-medium border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {children}

        {/* FOOTER */}
        <footer className="h-14 bg-white shadow-sm flex items-center justify-center text-xs text-gray-500">
          © 2025 Body Bio · All rights reserved
        </footer>
      </>
    </div>
  );
};
