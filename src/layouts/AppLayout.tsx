import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {
  const {
    data,
    isLoading,
    // error,
    isError,
  } = useQuery({
    // funcion que va a hacer la peticion a la api
    queryFn: getUser,
    // nombre en el que la query se va a guardar
    queryKey: ["user"],
    // las veces que va a intentar la peticion a la api
    retry: 2,
    // si el usuario cambia de pagina y la query ya se hizo, no vuelve a hacer la peticion a la api,
    refetchOnWindowFocus: false,
  });
  // console.log("User data", data);
  // console.log("User loading", isLoading);
  // console.log("User isError", isError);
  // console.log("User error", error);
  // console.log("User error message", error?.message);

  if (isLoading) {
    return "Cargando...";
    // return (
    //   <div className="flex h-screen items-center justify-center">
    //     <img src="/loader.svg" alt="loader" className="w-20 animate-spin" />
    //   </div>
    // );
  }

  if (isError) return <Navigate to={"/auth/login"} />;

  if (data) return <DevTree data={data} />;
}
