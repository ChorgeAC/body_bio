import axiosInstance from './axiosInstance';

export interface GetDoctorListRequest {}

export interface Doctor {
  id: number;
  name: string;
  email: string;
  speciality: string;
  status: string;
}

export const DoctorService = {
  async getDoctorList(payload: GetDoctorListRequest) {
    const res = await axiosInstance.post<Doctor[]>('/api/Doctor/getDoctorList', payload);
    return res.data;
  },
};
