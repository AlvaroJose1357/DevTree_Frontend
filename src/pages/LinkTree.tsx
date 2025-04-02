import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
export default function LinkTree() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

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
    const updateLinks = devTreeLinks.map((link) =>
      link.name === socialNetwork ? { ...link, enabled: !link.enabled } : link
    );
    // console.log(updateLinks);
    setDevTreeLinks(updateLinks);
  };
  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleURLChange={handleURLChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
    </div>
  );
}
