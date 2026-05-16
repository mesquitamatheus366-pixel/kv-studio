import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockKvElements } from "../data/mocks";
import type { KvElement } from "@kv/shared";

const TOOLS = [
  { key: "select", icon: "↖", label: "Selecionar" },
  { key: "move", icon: "✥", label: "Mover" },
  { key: "rect", icon: "▭", label: "Retângulo" },
  { key: "text", icon: "T", label: "Texto" },
  { key: "image", icon: "🖼", label: "Imagem" },
  { key: "crop", icon: "✂", label: "Recorte" },
  { key: "undo", icon: "↶", label: "Desfazer" },
  { key: "redo", icon: "↷", label: "Refazer" },
];

export function KvMaster() {
  const { id } = useParams();
  const [elements, setElements] = useState(mockKvElements);
  const [selectedId, setSelectedId] = useState<string>("e1");
  const [tab, setTab] = useState<"camadas" | "props" | "marca">("camadas");
  const selected = elements.find((e) => e.id === selectedId);

  const updateSelected = (patch: Partial<KvElement>) => {
    setElements((prev) => prev.map((e) => (e.id === selectedId ? { ...e, ...patch } : e)));
  };

  return (
    <div className="flex h-full">
      {/* Toolbar vertical */}
      <aside className="w-12 shrink-0 border-r border-neutral-200 bg-white py-2 flex flex-col gap-1">
        {TOOLS.map((t) => (
          <button
            key={t.key}
            title={t.label}
            className="w-10 h-10 mx-auto rounded-md hover:bg-neutral-100 flex items-center justify-center text-sm"
          >
            {t.icon}
          </button>
        ))}
      </aside>

      {/* Canvas central */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-neutral-200 bg-white px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="font-medium">KV master — Verão 2026</span>
            <span className="text-neutral-500">1080 × 1920 px</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md text-xs border border-neutral-300 hover:bg-neutral-50">Preview contextos</button>
            <Link
              to={`/projeto/${id}/formatos`}
              className="px-3 py-1 rounded-md text-xs bg-accent-500 text-white hover:bg-accent-600"
            >
              Avançar →
            </Link>
          </div>
        </div>

        <div className="flex-1 bg-neutral-100 p-8 flex items-center justify-center overflow-auto">
          <div className="relative bg-white shadow-lg" style={{ width: 360, height: 640 }}>
            {/* Render simplificado dos elementos */}
            {elements.map((e) => {
              const scaleX = 360 / 1080;
              const scaleY = 640 / 1920;
              return (
                <div
                  key={e.id}
                  onClick={() => setSelectedId(e.id)}
                  className={[
                    "absolute cursor-pointer flex items-center justify-center text-[10px] text-neutral-600 transition",
                    selectedId === e.id ? "ring-2 ring-accent-500" : "ring-1 ring-neutral-200",
                    e.type === "image" && "bg-gradient-to-br from-neutral-200 to-neutral-300",
                    e.type === "text" && "bg-white/80",
                    e.type === "shape" && "bg-accent-500 text-white font-medium",
                    e.type === "logo" && "bg-white",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{
                    left: e.x * scaleX,
                    top: e.y * scaleY,
                    width: e.w * scaleX,
                    height: e.h * scaleY,
                    opacity: e.visible === false ? 0.2 : 1,
                  }}
                >
                  {e.name.length > 22 ? e.name.slice(0, 22) + "…" : e.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Painel direito */}
      <aside className="w-72 shrink-0 border-l border-neutral-200 bg-white flex flex-col">
        <div className="flex border-b border-neutral-200">
          {(["camadas", "props", "marca"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                "flex-1 px-3 py-2 text-xs font-medium transition",
                tab === t ? "text-accent-700 border-b-2 border-accent-500" : "text-neutral-500 hover:bg-neutral-50",
              ].join(" ")}
            >
              {t === "camadas" ? "Camadas" : t === "props" ? "Propriedades" : "Marca"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto scrollbar-thin p-3 space-y-1">
          {tab === "camadas" &&
            elements.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelectedId(e.id)}
                className={[
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs",
                  selectedId === e.id ? "bg-accent-50 text-accent-700" : "hover:bg-neutral-100",
                ].join(" ")}
              >
                <span>{e.visible === false ? "🙈" : "👁"}</span>
                <span>{e.locked ? "🔒" : "  "}</span>
                <span className="flex-1 text-left truncate">{e.name}</span>
                <PriorityBadge p={e.priority} />
              </button>
            ))}

          {tab === "props" && selected && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-500 mb-1">Nome</label>
                <input
                  value={selected.name}
                  onChange={(e) => updateSelected({ name: e.target.value })}
                  className="w-full border border-neutral-200 rounded px-2 py-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["x", "y", "w", "h"] as const).map((k) => (
                  <div key={k}>
                    <label className="block text-neutral-500 mb-1 uppercase">{k}</label>
                    <input
                      type="number"
                      value={selected[k]}
                      onChange={(ev) => updateSelected({ [k]: Number(ev.target.value) } as any)}
                      className="w-full border border-neutral-200 rounded px-2 py-1"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-neutral-500 mb-1">Prioridade no desdobramento</label>
                <select
                  value={selected.priority}
                  onChange={(e) => updateSelected({ priority: e.target.value as KvElement["priority"] })}
                  className="w-full border border-neutral-200 rounded px-2 py-1"
                >
                  <option value="alta">Alta — nunca omitir</option>
                  <option value="media">Média — omitir em pequenos</option>
                  <option value="baixa">Baixa — omitir quando necessário</option>
                </select>
              </div>
              <div className="rounded-md bg-amber-50 border border-amber-200 p-2 text-amber-800">
                ⚠️ Regra de marca: <strong>headline sempre em caixa alta</strong> para Marlboro.
              </div>
            </div>
          )}

          {tab === "marca" && (
            <div className="text-xs space-y-3">
              <p className="text-neutral-600">Brand kit ativo: <strong>Marlboro</strong></p>
              <Link to="/brand-studio" className="text-accent-600 hover:underline">→ Abrir Brand Studio</Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function PriorityBadge({ p }: { p: KvElement["priority"] }) {
  const map = { alta: "bg-rose-100 text-rose-700", media: "bg-amber-100 text-amber-700", baixa: "bg-neutral-100 text-neutral-600" };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-semibold ${map[p]}`}>{p}</span>;
}
