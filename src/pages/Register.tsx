import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="text-4xl font-bold text-white">Crear Cuenta</div>
      <form
        onSubmit={() => {}}
        className="mt-10 space-y-10 rounded-lg bg-white px-5 py-20"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Repetir Password"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
          />
        </div>

        <input
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-cyan-400 p-3 text-lg font-bold uppercase text-slate-600"
          value="Crear Cuenta"
        />
      </form>
      <nav className="mt-10">
        <Link to="/auth/login" className="block text-center text-lg text-white">
          Ya tienes una cuenta? Inicia Sesion
        </Link>
      </nav>
    </>
  );
}
