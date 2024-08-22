import axios from 'axios';

export const fetchUserInfo = async (accessToken: string) => {
  const responseByToken = await axios({
    method: 'get',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ` + accessToken,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });

  return responseByToken;
};
