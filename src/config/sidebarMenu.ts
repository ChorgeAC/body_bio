// src/config/sidebarMenu.ts
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  FileText,
  User,
} from 'lucide-react';

export const sidebarMenu = {
  Admin: [
    {
      label: 'Dashboard',
      path: '/admin-portal',
      icon: LayoutDashboard,
    },
    {
      label: 'Admin Users',
      path: '/admin-portal/admin-users',
      icon: Users,
    },
    {
      label: 'Bio cell Users',
      path: '/admin-portal/users',
      icon: Users,
    },
    {
      label: 'Physicians',
      path: '/admin-portal/doctors',
      icon: Stethoscope,
    },
  ],

  Doctor: [
    {
      label: 'Dashboard',
      path: '/doctor-portal',
      icon: LayoutDashboard,
    },
    {
      label: 'Patients',
      path: '/doctor-portal/patients',
      icon: Stethoscope,
    },
    {
      label: 'Reports',
      path: '/doctor-portal/reports',
      icon: FileText,
    },
  ],

  User: [
    {
      label: 'Dashboard',
      path: '/user-portal',
      icon: LayoutDashboard,
    },
    {
      label: 'My Reports',
      path: '/user-portal/reports',
      icon: FileText,
    },
    {
      label: 'Profile',
      path: '/user-portal/profile',
      icon: User,
    },
  ],
};
