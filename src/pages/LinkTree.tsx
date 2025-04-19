import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidURL } from "../utils";
import { updateProfileUser } from "../api/DevTreeAPI";
import { SocialNetwork, User } from "../types";
export default function LinkTree() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfileUser,
    onSuccess: () => {
      toast.success("Actualizado correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const userLinks = JSON.parse(user.links);
    const updatedData = devTreeLinks.map((item) => {
      const userLink = userLinks.find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return {
          ...item,
          url: userLink.url,
          enabled: userLink.enabled,
        };
      }

      return item;
    });
    setDevTreeLinks(updatedData);
  }, []);

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
    // esto es para que se cache
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

    const selectedSocialNetwork = updateLinks.find(
      (link) => link.name === socialNetwork
    );
    if (selectedSocialNetwork?.enabled) {
      console.log("Link habilitado:", selectedSocialNetwork);
    } else {
      console.log("Link deshabilitado:", selectedSocialNetwork);
    }

    // codigo que almacena en la DB
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
          onClick={() => mutate(user)}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
}
