import { Axios } from '@apis/Axios';
import { TermProps } from 'src/types/term';

export const postTerms = async ({ termsOfUse, privacyPolicy }: TermProps) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const response = await Axios.post(
      `/api/terms`,
      { termsOfUse, privacyPolicy },
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};
