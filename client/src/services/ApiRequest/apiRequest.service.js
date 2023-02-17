import axios from "axios";
import { getAuthToken, getBaseUrl } from "../../utils";

const apiRequest = async ({
  method = "GET",
  url,
  path,
  data = {},
  headers,
}) => {
  const options = {
    method,
    url: url ? url : `${getBaseUrl()}${path}`,
    data,
    headers: headers || { Authorization: getAuthToken() },
  };

  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    return error;
  }
};
export default apiRequest;
