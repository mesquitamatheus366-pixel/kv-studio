import { useLocation, useParams, Link } from "react-router-dom";

export function Topbar() {
  const { pathname } = useLocation();
  const params = useParams();

  let breadcrumb = "Início";
  if (pathname.startsWith("/repositorio")) breadcrumb = "Repositório";
  else if (pathname.startsWith("/brand-studio")) breadcrumb = "Brand Studio";
  else if (pathname.startsWith("/spike")) breadcrumb = "Konva Spike";
  else if (params.id) {
    const phase = pathname.split("/").pop();
    const map: Record<string, string> = {
      kv: "KV master",
      formatos: "Formatos",
      wireframe: "Wireframe",
      dialogo: "Diálogo IA",
      revisao: "Revisão",
      aprovacao: "Aprovação",
    };
    breadcrumb = `Marlboro · Verão 2026 · ${map[phase ?? ""] ?? phase}`;
  }

  return (
    <header className="h-14 px-5 border-b border-neutral-200 bg-white flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/repositorio" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-accent-500 flex items-center justify-center text-white font-bold text-sm">
            kv
          </div>
          <span className="font-semibold text-neutral-900">kv.studio</span>
        </Link>
        <div className="text-sm text-neutral-500">{breadcrumb}</div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-md hover:bg-neutral-100 flex items-center justify-center" aria-label="Notificações">
          <span className="text-lg">🔔</span>
          <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-accent-500" />
        </button>
        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium text-neutral-700">
          MM
        </div>
      </div>
    </header>
  );
}
