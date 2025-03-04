import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";

export default function AppLayout() {
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
