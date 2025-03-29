import { isAxiosError } from "axios";
import api from "../config/axios";
import { User } from "../types";

export async function getUser() {
  try {
    const { data } = await api<User>("/user");
    // console.log(data);
    return data;
  } catch (error) {
    // console.log("", error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
