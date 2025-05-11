import { Link } from "react-router-dom";
export default function HomeNavigation() {
  return (
    <nav className="space-x-6 md:flex md:justify-end">
      <Link
        className="cursor-pointer rounded-lg bg-lime-500 p-2 text-xs font-black uppercase text-slate-800 transition hover:text-white hover:duration-200"
        to="/auth/login"
      >
        Iniciar Sesión
      </Link>

      <Link
        className="cursor-pointer rounded-lg bg-lime-500 p-2 text-xs font-black uppercase text-slate-800 transition hover:text-white hover:duration-200"
        to="/auth/register"
      >
        Registrarse
      </Link>
    </nav>
  );
}
