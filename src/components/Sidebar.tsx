// src/components/Sidebar/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { sidebarMenu } from '@/config/sidebarMenu';

const Sidebar = () => {
  const role = useSelector((state: RootState) => state.auth.role);

  if (!role) return null;

  const menuItems = sidebarMenu[role as keyof typeof sidebarMenu];

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
