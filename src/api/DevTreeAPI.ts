import { isAxiosError } from "axios";
import api from "../config/axios";

export async function getUser() {
  const token = localStorage.getItem("AUTH_TOKEN");
  try {
    const { data } = await api("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log("", error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
