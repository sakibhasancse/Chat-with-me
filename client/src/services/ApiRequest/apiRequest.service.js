import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { getAuthToken, getBaseUrl } from "../../utils";
const token = getAuthToken();
console.log({ token })
const instance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  }
});
instance.interceptors.request.use(
  (config) => {
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
    console.log({ err })
    const originalConfig = err.config;
    if (err?.code === 'ERR_NETWORK') toast.error('Internal server error')
    else if (err?.code == "ERR_BAD_REQUEST") toast.error(err?.message || 'Internal server error')

    if (err?.response) {
      // Access Token was expired
      if ((err.response.status === 401) && !originalConfig._retry) {
        originalConfig._retry = true;
        console.log('ssssss', err.response.status)
        try {
          const response = await fetchRefreshToken();
          console.log({ response })
          const { accessToken, refreshToken } = response?.tokens || {};
          Cookies.set('accessToken', accessToken, '30d')
          Cookies.set('refreshToken', refreshToken, '30d')
          instance.defaults.headers.common.Authorization = accessToken;

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
  console.log('refresh token')
  return instance.post("/auth/refresh-token", {
    refreshToken: Cookies.get('refreshToken'),
  });
}

export default instance