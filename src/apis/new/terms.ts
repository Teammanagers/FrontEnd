import { AxiosInstance } from '@/apis/new/axios-instance';
import { termsApiUrl } from '@/apis/new/urls';
import { ITerms } from '@/types/new/common';

export const createTerms = async ({
  termsOfUse,
  privacyPolicy
}: ITerms): Promise<void> => {
  const response = await AxiosInstance.post(termsApiUrl, {
    termsOfUse,
    privacyPolicy
  });
  return response.data;
};
