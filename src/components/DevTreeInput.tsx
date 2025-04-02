import { DevTreeLink } from "../types";

type DevTreeInputProps = {
  item: DevTreeLink;
};

export default function DevTreeInput({ item }: DevTreeInputProps) {
  return (
    <div className="flex items-center gap-5 rounded-xl bg-white p-5 shadow-lg">
      <div
        className="h-12 w-12 bg-cover"
        style={{ backgroundImage: `url(/social/icon_${item.name}.svg)` }}
      ></div>

      <input type="text" className="flex-1 rounded-xl border border-gray-200" />
    </div>
  );
}
