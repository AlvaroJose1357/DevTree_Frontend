import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};
export default function HandleData({ data }: HandleDataProps) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  );
  return (
    <div className="space-y-6 text-white">
      <h1 className="text-center text-5xl font-black">{data.handle}</h1>
      {data.image && <img src={data.image} className="mx-auto max-w-[250px]" />}
      <p className="text-center text-lg font-semibold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-5">
        {links.length ? (
          links.map((link) => (
            <a
              className="flex items-center gap-5 rounded-xl bg-white px-5 py-2 shadow-md transition-all duration-300 hover:scale-105"
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              key={link.name}
            >
              <img
                src={`social/icon_${link.name}.svg`}
                alt="Imagen red social"
                className="w-12"
              />
              <p className="group relative inline-block cursor-pointer text-lg font-medium capitalize text-black">
                Visita mi: {link.name}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              </p>
            </a>
          ))
        ) : (
          <p className="text-center text-lg font-black">
            No hay links habilitados
          </p>
        )}
      </div>
    </div>
  );
}
//   const { data } = props;
