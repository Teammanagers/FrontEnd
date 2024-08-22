import { Axios } from '@apis/Axios';
import { TermProps } from 'src/types/term';

export const postTerms = async ({ termsOfUse, privacyPolicy }: TermProps) => {
  try {
    const response = await Axios.post(
      `/api/terms`,
      { termsOfUse, privacyPolicy },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json'
        }
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
