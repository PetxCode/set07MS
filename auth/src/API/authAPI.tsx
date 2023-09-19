import axios from "axios";

const URL: string = "http://localhost:3344";
const URL2: string = "http://localhost:3355";

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

export const viewPeoductAPI = async (token: string) => {
  try {
    const config: any = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return await axios
      .get(`${URL2}/api/all-view-products`, config)
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
      });
  } catch (error) {
    console.log(error);
  }
};
