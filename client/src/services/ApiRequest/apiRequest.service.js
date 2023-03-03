import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { setUserToken } from '../../context/AuthContext';
import { getAuthToken, getBaseUrl } from "../../utils";

const instance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    console.log({ token })
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config;
  },
  (error) => {
    console.log({ error })
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (result) => {
    return result?.data
  },
  async (err) => {
    const originalConfig = err.config;
    if (err?.code === 'ERR_NETWORK') toast.error('Internal server error')
    else if (err?.code == "ERR_BAD_REQUEST") toast.error(err?.message || 'Internal server error')

    if (err?.response) {
      // Access Token was expired
      if ((err?.response?.data?.message === 'Token is expires') && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const response = await fetchRefreshToken();
          console.log({ response })
          const { accessToken } = response?.tokens || {};
          setUserToken(response?.tokens)
          instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

const fetchRefreshToken = () => {
  return instance.post("/auth/refresh-token", {
    refreshToken: Cookies.get('refreshToken'),
  });
}

export default instance