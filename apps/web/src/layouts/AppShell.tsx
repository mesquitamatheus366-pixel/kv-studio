import { Outlet, useLocation, useParams } from "react-router-dom";
import { Topbar } from "../components/Topbar";
import { Sidebar } from "../components/Sidebar";
import { Stepper } from "../components/Stepper";

export function AppShell() {
  const { pathname } = useLocation();
  const params = useParams();
  // Stepper só aparece quando está dentro de um projeto
  const showStepper = pathname.startsWith("/projeto/");
  const projectId = params.id;

  return (
    <div className="h-full flex flex-col">
      <Topbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {showStepper && projectId && <Stepper projectId={projectId} />}
          <div className="flex-1 overflow-auto scrollbar-thin">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
