import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img src="/logo.svg" alt="Logo" className="block w-full lg:p-0" />
    </Link>
  );
}
