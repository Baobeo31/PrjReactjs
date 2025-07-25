import axios from "axios";

export const loginUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
  return res.data
}

export const signupUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
  return res.data
}

export const sendOTP = async (email) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, email);
  return res.data
};

export const verifyOTPAndResetPassword = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, data);
  return res.data
};