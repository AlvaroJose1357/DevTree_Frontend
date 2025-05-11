import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export default function AdminNavigation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = () => {
    // Invalidate all queries to refetch data
    queryClient.invalidateQueries({ queryKey: ["user"] });
    localStorage.removeItem("AUTH_TOKEN");
    navigate("/");
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
