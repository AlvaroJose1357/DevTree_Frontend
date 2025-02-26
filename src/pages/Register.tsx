import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error from "../components/Error";
import type { RegisterForm } from "../types";
import axios, { isAxiosError } from "axios";

export default function Register() {
  const INITIAL_VALUES = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: INITIAL_VALUES });

  const watchPassword = watch("password");

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log(data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.error);
      }
    }
  };

  return (
    <>
      <div className="text-4xl font-bold text-white">Crear Cuenta</div>
      <form
        onSubmit={handleSubmit(handleRegister)}
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
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <Error>{errors.name.message?.toString()}</Error>}
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
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "El Email no es válido",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message?.toString()}</Error>}
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
            {...register("handle", { required: "El Handle es obligatorio" })}
          />
          {errors.handle && <Error>{errors.handle.message?.toString()}</Error>}
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
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <Error>{errors.password.message?.toString()}</Error>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="rounded-lg border-none bg-slate-100 p-3 placeholder-slate-400"
            {...register("password_confirmation", {
              required: "La confirmacion es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe tener al menos 8 caracteres",
              },
              validate: (value) =>
                value === watchPassword || "Las contraseñas no coinciden",
            })}
          />
          {errors.password_confirmation && (
            <Error>{errors.password_confirmation.message?.toString()}</Error>
          )}
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
