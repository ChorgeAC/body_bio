import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import AdminPortal from '../pages/admin/AdminPortal';
import { ForgotUpdatePassword } from '../pages/ForgotUpdatePassword ';
import ReportPreview from '../pages/ReportPreview';
import ProtectedRoute from './ProtectedLayout';
import AppLayout from './AppLayout';
import AdminUser from '@/pages/admin/AdminUser';
import BioUser from '@/pages/bioUser/BioUser';
import Doctor from '@/pages/doctor/Doctor';
import CreateBioUser from '@/pages/bioUser/CreateBioUser';
import CreateNewTemplate from '@/components/CreateNewTemplate';
import { PendingReportsTable } from '@/components/PendingReportsTable';
import GetDoctorDetails from '@/pages/doctor/GetDoctorDetails';
import CreateDoctor from '@/pages/doctor/CreateDoctor';
import CreateAdmin from '@/pages/admin/CreateAdmin';
import CreatePatient from '@/pages/patient/CreatePatient';
import PatientVisitDetailsView from '@/components/PatientVisitDetailsView';
import DoctorPortal from '@/pages/doctor/DoctorPortal';
import BioUserPortal from '@/pages/bioUser/BioUserPortal';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />

      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/forgot-update" element={<ForgotUpdatePassword />} />

      {/* ADMIN */}
      <Route
        path="/admin-portal"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminPortal />} />
        <Route path="admin-users" element={<AdminUser />} />
        <Route path="users" element={<BioUser />} />
        <Route path="doctors" element={<Doctor />} />
        <Route path="doctor/:id/patients" element={<GetDoctorDetails />} />
        <Route path="create-new-template" element={<CreateNewTemplate />} />
        <Route path="pending-reports" element={<PendingReportsTable />} />
        <Route path="pending-reports/preview/:visitId" element={<ReportPreview />} />
        <Route path="doctor/:id/patient/:id/visit-info" element={<PatientVisitDetailsView />} />
        {/* Create New User Routes */}
        <Route path="create-user" element={<CreateBioUser />} />
        <Route path="create-doctor" element={<CreateDoctor />} />
        <Route path="create-admin" element={<CreateAdmin />} />
        <Route path="create-patient" element={<CreatePatient />} />
        {/* Edit Existing User Routes */}
        <Route path="edit-user/:id" element={<CreateBioUser />} />
        <Route path="edit-doctor/:id" element={<CreateDoctor />} />
        <Route path="edit-admin/:id" element={<CreateAdmin />} />
        <Route path="edit-patient/:id" element={<CreatePatient />} />
      </Route>

      {/* DOCTOR */}
      <Route
        path="/doctor-portal"
        element={
          <ProtectedRoute allowedRoles={['Doctor']}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorPortal />} />
        <Route path="pending-reports" element={<PendingReportsTable />} />
        <Route path="doctor/:id/patients" element={<GetDoctorDetails />} />
        <Route path="doctor/:id/patient/:id/visit-info" element={<PatientVisitDetailsView />} />
        <Route path="pending-reports/preview/:visitId" element={<ReportPreview />} />
      </Route>

      {/* USER */}
      <Route
        path="/user-portal"
        element={
          <ProtectedRoute allowedRoles={['User']}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<BioUserPortal />} />
        <Route path="doctors" element={<Doctor />} />
        <Route path="doctor/:id/patients" element={<GetDoctorDetails />} />
        <Route path="doctor/:id/patient/:id/visit-info" element={<PatientVisitDetailsView />} />
        <Route path="pending-reports" element={<PendingReportsTable />} />
        <Route path="pending-reports/preview/:visitId" element={<ReportPreview />} />
        <Route path="create-new-template" element={<CreateNewTemplate />} />
        {/* Create New User Routes */}
        <Route path="create-doctor" element={<CreateDoctor />} />
        <Route path="create-patient" element={<CreatePatient />} />
        {/* Edit Existing User Routes */}
        <Route path="edit-doctor/:id" element={<CreateDoctor />} />
        <Route path="edit-patient/:id" element={<CreatePatient />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
