import axios from 'axios';

export const naverLogin = async (code, state) => {
  try {
    const tokenResponse = await axios.post(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${import.meta.env.NAVER_CLIENT_ID}&client_secret=${import.meta.env.VITE_NAVER_CLIENT_SECRET}&code=${code}&state=${state}`
    );

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get(
      'https://openapi.naver.com/v1/nid/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return userInfoResponse.data;
  } catch (error) {
    console.error('Naver login error:', error);
    throw error;
  }
};
