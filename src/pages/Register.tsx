import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <div>Register</div>;
      <nav>
        <Link to="/auth/login">Ya tienes una cuenta? Inicia Sesion</Link>
      </nav>
    </>
  );
}
