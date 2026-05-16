import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockFormats } from "../data/mocks";
import { StatusDot } from "../components/StatusDot";
import { useUI } from "../lib/store";
import type { FormatStatus } from "@kv/shared";

export function Aprovacao() {
  const { id } = useParams();
  const { rolePreview, setRolePreview } = useUI();

  const allFormats = mockFormats.slice(0, 8);
  const [statuses, setStatuses] = useState<Record<string, FormatStatus>>(
    Object.fromEntries(allFormats.map((f, i) => [f.id, i < 5 ? "aprovado" : "em_producao"])),
  );
  const [selected, setSelected] = useState<string | null>(allFormats[0].id);
  const [comment, setComment] = useState("");

  const setStatus = (fid: string, s: FormatStatus) => setStatuses((p) => ({ ...p, [fid]: s }));

  const total = allFormats.length;
  const aprovados = Object.values(statuses).filter((s) => s === "aprovado" || s === "revisado_ok").length;

  const selectedFormat = allFormats.find((f) => f.id === selected);
  const selectedStatus = selected ? statuses[selected] : null;

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-auto scrollbar-thin">
        <div className="p-6 space-y-4">
          {/* Header com toggle de papel */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Aprovação</h1>
              <p className="text-sm text-neutral-500 mt-1">
                {rolePreview === "senior"
                  ? "Você está revisando como sênior/DA. Aprove ou reprove cada formato."
                  : "Você está revisando como revisora. Marque ok ou aponte correções de texto."}
              </p>
            </div>

            <div className="inline-flex rounded-md border border-neutral-300 p-0.5 bg-white">
              <button
                onClick={() => setRolePreview("senior")}
                className={[
                  "px-3 py-1.5 rounded text-xs font-medium",
                  rolePreview === "senior" ? "bg-accent-500 text-white" : "text-neutral-600 hover:bg-neutral-100",
                ].join(" ")}
              >
                Sênior / DA
              </button>
              <button
                onClick={() => setRolePreview("revisora")}
                className={[
                  "px-3 py-1.5 rounded text-xs font-medium",
                  rolePreview === "revisora" ? "bg-pink-500 text-white" : "text-neutral-600 hover:bg-neutral-100",
                ].join(" ")}
              >
                Revisora
              </button>
            </div>
          </header>

          {/* Barra de progresso */}
          <div className="rounded-lg bg-white border border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-neutral-600">Progresso de revisão</span>
              <span className="font-medium">{aprovados} de {total}</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(aprovados / total) * 100}%` }} />
            </div>
          </div>

          {/* Grid de formatos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allFormats.map((f) => {
              const st = statuses[f.id];
              const isSel = selected === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelected(f.id)}
                  className={[
                    "rounded-lg border-2 p-3 text-left bg-white transition",
                    isSel ? "border-accent-500" : "border-neutral-200 hover:border-neutral-300",
                  ].join(" ")}
                >
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 aspect-[4/3] rounded mb-2" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium truncate">{f.label.split("—")[0].trim()}</span>
                    <StatusDot status={st} />
                  </div>
                </button>
              );
            })}
          </div>

          {rolePreview === "senior" && (
            <button className="px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600">
              ✓ Aprovar todos
            </button>
          )}
        </div>
      </div>

      {/* Sidebar contextual ao formato */}
      {selectedFormat && selectedStatus && (
        <aside className="w-80 shrink-0 border-l border-neutral-200 bg-white flex flex-col overflow-hidden">
          <div className="p-4 border-b border-neutral-200">
            <h3 className="font-semibold text-sm">{selectedFormat.label}</h3>
            <div className="mt-2"><StatusDot status={selectedStatus} withLabel /></div>
          </div>

          <div className="p-4 space-y-4 overflow-auto scrollbar-thin flex-1">
            <section>
              <h4 className="text-xs font-semibold uppercase text-neutral-500 mb-2">Leitura da IA</h4>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Vetor: logo → hero → headline → cta. Crop priorizou rosto e produto. CTA mantém contraste mínimo
                AA. Aviso sanitário em 22% da área (acima do mínimo regulatório).
              </p>
            </section>

            <section>
              <h4 className="text-xs font-semibold uppercase text-neutral-500 mb-2">Comentário</h4>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder={rolePreview === "senior" ? "Apontamento ao designer..." : "Correção de texto..."}
                className="w-full border border-neutral-300 rounded-md px-2 py-1.5 text-sm"
              />
            </section>

            <section className="space-y-2 pt-2 border-t border-neutral-200">
              {rolePreview === "senior" ? (
                <>
                  <button
                    onClick={() => selected && setStatus(selected, "aprovado")}
                    className="w-full px-3 py-2 rounded-md bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600"
                  >
                    ✓ Aprovar
                  </button>
                  <button
                    onClick={() => selected && setStatus(selected, "editado")}
                    className="w-full px-3 py-2 rounded-md bg-rose-500 text-white text-sm font-medium hover:bg-rose-600"
                  >
                    ✗ Reprovar (volta ao designer)
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => selected && setStatus(selected, "revisado_ok")}
                    className="w-full px-3 py-2 rounded-md text-sm font-medium text-white hover:opacity-90"
                    style={{ background: "#fbcfe8", color: "#831843" }}
                  >
                    🩷 OK — sem apontamentos
                  </button>
                  <button
                    onClick={() => selected && setStatus(selected, "revisora_ajuste")}
                    className="w-full px-3 py-2 rounded-md bg-pink-500 text-white text-sm font-medium hover:bg-pink-600"
                  >
                    🌸 Apontar correção
                  </button>
                </>
              )}
            </section>
          </div>
        </aside>
      )}
    </div>
  );
}
