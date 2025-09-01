import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
  try {
    const response = await axios.post(
      "/token/refresh/",
      { refresh: auth?.refreshToken },
      { withCredentials: true }
    );

    setAuth(prev => {
      return {
        ...prev,
        accessToken: response.data.access,
        
        refreshToken: response.data.refresh || prev.refreshToken 
      };
    });
     console.log("RefreshedFromFrontEnd",response.data.access);
    return response.data.access;
  } catch (err) {
    console.error("Refresh token failed:", err.response?.data || err.message);
    return null;
  }
};

  return refresh;
};

export default useRefreshToken;



