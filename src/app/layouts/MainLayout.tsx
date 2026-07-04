import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <>
      <header>Header</header>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </>
  );
}