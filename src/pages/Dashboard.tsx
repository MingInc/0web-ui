import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="flex w-full flex-col">
      <main className="mx-[5vw] py-3">
        <Outlet />
      </main>
    </div>
  );
}
