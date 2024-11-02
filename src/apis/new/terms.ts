import { AxiosInstance } from '@/apis/new/axios-instance';
import { termsApiUrl } from '@/apis/new/urls';

export const createTerms = async (): Promise<void> => {
  const response = await AxiosInstance.post(termsApiUrl);
  return response.data;
};
