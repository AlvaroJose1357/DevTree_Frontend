import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";
import { LoginForm } from "../types";
// import { isAxiosError } from "axios";
// import { toast } from "sonner";
// import api from "../config/axios";

export default function Login() {
  const INITIAL_VALUES = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({ defaultValues: INITIAL_VALUES });

  const handleLogin = async (formData: LoginForm) => {
    try {
      console.log("Form data", formData);
      const { data } = await api.post("/auth/login", formData);
      console.log("Data", data);
      toast.success(data);
      reset();
    } catch (error) {
      console.log("Error en login", error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  return (
    <>
      <div className="text-4xl font-bold text-white"> Iniciar Sesion</div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-10 space-y-10 rounded-lg bg-white px-5 py-20"
        noValidate
      >
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
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
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
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <input
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-cyan-400 p-3 text-lg font-bold uppercase text-slate-600"
          value="Iniciar Sesión"
        />
      </form>
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
