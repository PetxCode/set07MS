import axios from "axios";

const URL: string = "http://localhost:3344";

export const registerAPI = async (data: any) => {
  try {
    return await axios.post(`${URL}/api/register`, data).then((res) => {
      return res.data.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const signInAPI = async (data: any) => {
  try {
    return await axios.post(`${URL}/api/sign-in`, data).then((res) => {
      console.log(res.data.data);
      return res.data.data;
    });
  } catch (error) {
    console.log(error);
  }
};
