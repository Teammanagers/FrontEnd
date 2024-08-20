import axios from 'axios';

export const kakaoLogin = async (code) => {
  try {
    const tokenResponse = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&code=${code}&client_secret=${import.meta.env.VITE_KAKAO_CLIENT_SECRET}`
    );

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return userInfoResponse.data;
  } catch (error) {
    console.error('Kakao login error:', error);
    throw error;
  }
};
