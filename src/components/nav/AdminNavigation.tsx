import { useQueryClient } from "@tanstack/react-query";
export default function AdminNavigation() {
  const queryClient = useQueryClient();
  const logout = () => {
    // Invalidate all queries to refetch data
    queryClient.invalidateQueries({ queryKey: ["user"] });
    localStorage.removeItem("AUTH_TOKEN");
  };
  return (
    <button
      className="cursor-pointer rounded-lg bg-lime-500 p-2 text-xs font-black uppercase text-slate-800"
      onClick={logout}
    >
      Cerrar Sesión
    </button>
  );
}
