import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-slate-800">
        <div className="mx-auto max-w-lg px-5 pt-10">
          <img src="/logo.svg" alt="LogoDevtree" />
          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
