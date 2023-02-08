import Cookie from "js-cookie";

export const getBaseUrl = () => process.env.REACT_APP_BASE_API_URL;
export const getAuthToken = () => Cookie.get("token");
