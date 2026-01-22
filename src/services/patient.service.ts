// services/patient.service.ts
import axiosInstance from './axiosInstance';

export interface GetPatientListRequest {
  patientId: number;
}

export interface Patient {
  id?: number;
  name: string;
  email: string;
  lastVisit: string;
  status: string;
}

export const PatientService = {
  async getPatientList(payload: GetPatientListRequest) {
    const res = await axiosInstance.post<Patient[]>(
      '/api/Patient/getPatientList',
      payload
    );
    return res.data;
  },
};
