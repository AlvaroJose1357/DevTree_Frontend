import { useState } from "react";
import { toast } from "sonner";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidURL } from "../utils";
import { updateProfileUser } from "../api/DevTreeAPI";
import { User } from "../types";
export default function LinkTree() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = new QueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfileUser,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("que se esta copiando", event.target.value);
    // console.log("hacia que red social", event.target.name);
    const updateLinks = devTreeLinks.map((link) =>
      link.name === event.target.name
        ? { ...link, url: event.target.value }
        : link
    );
    // if (item.name === event.target.name) {
    //   return { ...item, url: event.target.value };
    // }
    // return item;
    // });
    setDevTreeLinks(updateLinks);
  };

  const handleEnableLink = (socialNetwork: string) => {
    // console.log(socialNetwork);
    const updateLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidURL(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Por favor, ingrese una URL válida", {
            description: "La URL que ingresó no es válida",
          });
        }
      }
      return link;
    });
    // console.log(updateLinks);
    setDevTreeLinks(updateLinks);
    queryClient.setQueryData(["user"], (oldData: User) => {
      return {
        ...oldData,
        links: JSON.stringify(updateLinks),
      };
    });
  };
  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleURLChange={handleURLChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="w-full rounded-lg bg-cyan-400 p-2 text-lg font-bold uppercase text-slate-600"
          onClick={() => {
            mutate(user);
          }}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
}
