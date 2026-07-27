import { Outlet } from "react-router-dom";
import { Dumbbell } from "lucide-react";

function Layout() {
  return (
    <>
      <header className="flex items-center gap-2 px-6 py-5">
        <Dumbbell className="h-6 w-6 text-lime-400" />

        <h1 className="logo-font text-2xl font-black tracking-wide">
          <span className="bg-gradient-to-r from-white via-lime-300 to-lime-500 bg-clip-text text-transparent">
            NutriLens
          </span>
        </h1>
      </header>

      <Outlet />
    </>
  );
}

export default Layout;