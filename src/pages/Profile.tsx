import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserProfile } from "../types";
import { updateProfileUser, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";

export default function Profile() {
  // para la obtencion de datos cacheados de la query
  // useQueryClient es un hook que nos permite acceder al cliente de la query
  const queryClient = useQueryClient();
  // getQueryData es un metodo que nos permite obtener los datos cacheados de la query, ["user"] es el nombre de la query que se guardo en el cliente de la query, se le coloca el ! al final ya que estamos haciendo la validacion en applayout.tsx de que si no existe el usuario, si este [user] no existe, va a ir hacia el useQuery de aplayout.tsx
  const data: User = queryClient.getQueryData(["user"])!;

  const INITIAL_VALUES = {
    handle: data?.handle,
    description: data?.description,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>({ defaultValues: INITIAL_VALUES });

  // mutacion para nuestra propia API
  const updateProfileMutation = useMutation({
    mutationFn: updateProfileUser,
    onSuccess: (data) => {
      toast.success(data);
      // lo que hace es invalidar la query, es decir, vuelve a hacer la peticion a la api y actualiza los datos en cache
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleProfile = (formData: UserProfile) => {
    // console.log("Form data", formData);
    const user: User = queryClient.getQueryData(["user"])!;
    user.description = formData.description;
    user.handle = formData.handle;
    updateProfileMutation.mutate(user);
  };

  // mutacion para subir la imagen
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log("success", data);
      // esto se le conoce como optimistic update, es decir, que antes de que la mutacion se complete, se actualizan los datos en cache, para que el usuario vea los cambios inmediatamente, y luego se hace la peticion a la api para actualizar los datos en cache
      queryClient.setQueryData(["user"], (oldData: User) => {
        // console.log("oldData", oldData);
        return {
          ...oldData,
          image: data,
        };
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      uploadImageMutation.mutate(event.target.files[0]);
    }
  };
  return (
    <form
      className="space-y-5 rounded-lg bg-white p-10"
      onSubmit={handleSubmit(handleProfile)}
    >
      <legend className="text-center text-2xl text-slate-800">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="rounded-lg border-none bg-slate-100 p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "El handle es obligatorio",
          })}
        />
        {errors.handle && <Error>{errors.handle.message}</Error>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="rounded-lg border-none bg-slate-100 p-2"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.description && <Error>{errors.description.message}</Error>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="rounded-lg border-none bg-slate-100 p-2"
          accept="image/*" // Solo acepta archivos de imagen
          onChange={handleImageChange}
        />
      </div>

      <input
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-cyan-400 p-2 text-lg font-bold uppercase text-slate-600"
        value="Guardar Cambios"
      />
    </form>
  );
}
