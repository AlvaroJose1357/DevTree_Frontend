import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import LinkTree from "../pages/LinkTree";
import Profile from "../pages/Profile";
import Handle from "../pages/Handle";
import NotFoundUser from "../pages/NotFoundUser";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<LinkTree />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/:handle" element={<AuthLayout />}>
          <Route index={true} element={<Handle />} />
        </Route>
        <Route path="/404" element={<AuthLayout />}>
          <Route index={true} element={<NotFoundUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
