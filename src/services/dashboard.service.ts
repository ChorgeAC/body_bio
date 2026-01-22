import axiosInstance from './axiosInstance';

const DASHBOARD_API = '/api/DashBoard';

export interface DashboardResponse {
  totalPhysicians: number;
  bioCellUsers: number;
  totalPatients: number;
  pendingReports: number;
}

export const DashboardService = {
  getDashboardDetails(): Promise<DashboardResponse> {
    return axiosInstance
      .get<DashboardResponse>(`${DASHBOARD_API}/getDashBoardDetails`)
      .then((res) => res.data);
  },
};
