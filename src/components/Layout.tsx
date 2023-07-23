import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
