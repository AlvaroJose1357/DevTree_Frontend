import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div>Desde Login</div>
      <nav>
        <Link to="/auth/register">No tienes cuenta? Crea una aqui</Link>
      </nav>
    </>
  );
}
