import { Link, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useQuery } from "@tanstack/react-query";
import NavigationTabs from "../components/NavigationTabs";
import { getUser } from "../api/DevTreeAPI";

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
    retry: 1,
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

  return (
    <>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto flex max-w-5xl flex-col items-center md:flex-row md:justify-between">
          <div className="w-full p-5 md:w-1/3 lg:p-0">
            <img src="/logo.svg" className="block w-full" />
          </div>
          <div className="md:flex md:w-1/3 md:justify-end">
            <button
              className="cursor-pointer rounded-lg bg-lime-500 p-2 text-xs font-black uppercase text-slate-800"
              onClick={() => {}}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gray-100 py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="text-right text-2xl font-bold text-slate-800"
              to={""}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-10 md:flex-row">
            <div className="flex-1">
              <Outlet />
            </div>
            <div className="w-full space-y-6 bg-slate-800 px-5 py-10 md:w-96">
              {/* aqui va el drag and drop */}
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
