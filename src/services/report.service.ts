// services/patient.service.ts
import axiosInstance from './axiosInstance';

interface reportRequest {}

export interface Report {
  reportId?: string;
  reportName?: string;
  patient?: string;
  doctor?: string;
  status: string;
  createdAt?: string; // ISO date string from API
}

export const ReportService = {
  async getPatientList(payload: reportRequest) {
    const res = await axiosInstance.post<Report[]>('/api/DashBoard/getPendingReportsList', payload);
    return res.data;
  },
};
