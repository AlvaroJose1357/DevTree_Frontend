import { SocialNetwork } from "../types";

type DevTreeLinksProps = {
  link: SocialNetwork;
};

export default function DevTreeLinks({ link }: DevTreeLinksProps) {
  return (
    <li className="flex items-center gap-5 rounded-xl bg-white px-5 py-2">
      <div
        className="h-12 w-12 bg-cover"
        style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}
      ></div>
      <p className="capitalize">
        Visita mi: <span className="font-bold">{link.name}</span>
      </p>
    </li>
  );
}
