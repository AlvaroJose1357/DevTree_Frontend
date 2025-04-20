import { isAxiosError } from "axios";
import api from "../config/axios";
import { User, UserHandle } from "../types";

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
export async function updateProfileUser(formData: User) {
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
    // lo que se hace es desestructurar el data de la respuesta, y dentro de ese data, se desestructura el image, que es lo que nos interesa, ya que es la url de la imagen que se subio, para asi despues darle el type de la imagen por medio de otro destructuring const { data: { image }}: { data: { image: string } }, ya como obtenemos la imagen en la variable image la retornamos
    const {
      data: { image },
    }: { data: { image: string } } = await api.post("/user/image", formData);
    return image;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function getUserByHandle(handle: string) {
  try {
    const { data } = await api.get<UserHandle>(`/${handle}`);
    // console.log(data);
    return data;
  } catch (error) {
    // console.log("", error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
