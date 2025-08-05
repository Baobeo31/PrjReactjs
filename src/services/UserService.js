import axios from "axios";

export const loginUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data, {
    withCredentials: true,
  })

  return res.data
}

export const signupUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
  return res.data
}

export const sendOTP = async (email) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sendOTP`, { email });
  return res.data
}

export const verifyOTPAndResetPassword = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/verify`, data);
  return res.data
}
export const logout = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`, {}, {
    withCredentials: true,
  })
  return res.data
}
