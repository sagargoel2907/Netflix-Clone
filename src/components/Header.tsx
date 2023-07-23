import React from "react";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";
import { Link, NavLink } from "react-router-dom";

function Header() {
  function isActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? "font-semibold text-white" : "";
  }
  return (
    <header className="border-b-2 py-2">
      <nav className="grid grid-cols-[200px_auto_200px] gap-4 items-center">
        <section className="h-12">
          <Link to="/">
            <img src={netflixLogo} className="h-full w-full object-contain" />
          </Link>
        </section>
        <section className="text-gray-300 text-sm">
          <ul className="flex gap-2">
            <li>
              <NavLink className={isActiveLink} to="/browse">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/genre/tv-shows">
                TV Shows
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/genre/movies">
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/latest">
                New & Popular
              </NavLink>
            </li>
          </ul>
        </section>
        <section>secondary nav</section>
      </nav>
    </header>
  );
}

export default Header;
