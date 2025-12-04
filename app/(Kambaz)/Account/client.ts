import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: unknown) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: unknown) => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
  } catch (error: unknown) {
    // Return the error message from server
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: unknown } };
      if (axiosError.response?.data) {
        throw axiosError.response.data;
      }
    }
    throw error;
  }
};

export const profile = async () => {
  try {
    const response = await axiosWithCredentials.get(`${USERS_API}/profile`);
    return response.data;
  } catch (error: unknown) {
    // If 401 (unauthorized), user is not logged in - return null silently
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 401) {
        return null;
      }
    }
    // For other errors, still throw
    console.error('Profile fetch error:', error);
    throw error;
  }
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateUser = async (user: unknown) => {
  const userObj = user as { _id: string };
  const response = await axiosWithCredentials.put(`${USERS_API}/${userObj._id}`, user);
  return response.data;
};

// ========== USER MANAGEMENT FUNCTIONS ==========

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

export const createUser = async (user: unknown) => {
  const response = await axiosWithCredentials.post(USERS_API, user);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};