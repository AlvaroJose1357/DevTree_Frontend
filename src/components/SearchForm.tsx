import Error from "./Error";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  });

  const mutation = useMutation({
    mutationFn: searchByHandle,
  });

  // Watch the input value
  const handle = watch("handle");
  // Log the input value

  const handleSearch = () => {
    const slugifiedHandle = slugify(handle);
    mutation.mutate(slugifiedHandle);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
      <div className="relative flex items-center bg-white px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="flex-1 border-none bg-transparent p-2 focus:ring-0"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && <Error>{errors.handle.message}</Error>}

      <div className="mt-10">
        {mutation.isPending && (
          <p className="text-center">Buscando usuario...</p>
        )}
        {mutation.isError && (
          <p className="text-center font-black text-red-600">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center font-black text-cyan-400">
            {mutation.data} ir a{" "}
            <Link
              className="transitionhover:duration-200 hover:text-cyan-500"
              to={"/auth/register"}
              state={{
                handle: slugify(handle),
              }}
            >
              Registro
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-cyan-400 p-3 text-lg font-bold uppercase text-slate-600"
        value="Obtener mi DevTree"
      />
    </form>
  );
}
