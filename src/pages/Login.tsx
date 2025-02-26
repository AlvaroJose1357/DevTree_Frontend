import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="text-4xl font-bold text-white"> Iniciar Sesion</div>
      <nav className="mt-10">
        <Link
          to="/auth/register"
          className="block text-center text-lg text-white"
        >
          No tienes cuenta? Crea una aqui
        </Link>
      </nav>
    </>
  );
}
