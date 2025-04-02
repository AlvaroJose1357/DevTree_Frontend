import { isAxiosError } from "axios";
import api from "../config/axios";
import { User, UserProfile } from "../types";

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
export async function updateProfileUser(formData: UserProfile) {
  try {
    const { data } = await api.patch<string>("/user", formData);
    // console.log(data);
    return data;
  } catch (error) {
    // console.log("", error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await api.post<string>("/user/image", formData);
    return data;
    console.log("subiendo imagen");
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
