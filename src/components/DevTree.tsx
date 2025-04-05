import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "./NavigationTabs";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLinks from "./DevTreeLinks";

type DevTreeProps = { data: User };
export default function DevTree({ data }: DevTreeProps) {
  const [enableLinks, setEnableLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnableLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [data]);
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
              Visitar Mi Perfil: /{data.handle}
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-10 md:flex-row">
            <div className="flex-1">
              <Outlet />
            </div>
            <div className="w-full space-y-6 bg-slate-800 px-5 py-10 md:w-96">
              <p className="text-center text-4xl text-white">{data.handle}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt="Imagen Perfil"
                  className="mx-auto max-w-[250px]"
                />
              )}
              <p className="text-center text-lg font-black text-white">
                {data.description}
              </p>
              <div className="mt-20 flex flex-col gap-5">
                {enableLinks.length > 0 ? (
                  enableLinks.map((link) => (
                    <DevTreeLinks key={link.name} link={link} />
                  ))
                ) : (
                  <p className="text-center text-lg font-black text-white">
                    No hay links habilitados
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
