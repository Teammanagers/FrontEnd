import { AxiosInstance } from '@/apis/new/axios-instance';
import { PortfolioResponse, DetailedPortfolio } from 'src/types/portfolio';

//내 포트폴리오 조회
export const getSimplePortfolio = async (): Promise<PortfolioResponse> => {
  try {
    const response = await AxiosInstance.get<PortfolioResponse>(
      `/api/member/portfolio`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('포트폴리오 fetch 실패:', error);
    throw error;
  }
};

//내 포트폴리오 상세 조회
export const getDetailedPortfolio = async (
  teamId: number
): Promise<DetailedPortfolio> => {
  try {
    const response = await AxiosInstance.get<DetailedPortfolio>(
      `/api/member/portfolio/${teamId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('포트폴리오 fetch 실패:', error);
    throw error;
  }
};
