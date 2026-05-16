import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockFormats } from "../data/mocks";
import { StatusDot, STATUS_LEGEND } from "../components/StatusDot";
import type { FormatStatus } from "@kv/shared";

type FormatState = { id: string; status: FormatStatus; edited: boolean };

export function Revisao() {
  const { id } = useParams();

  // Mostra os 5 sugeridos + 3 derivados como exemplo
  const allFormats = mockFormats.slice(0, 8);
  const [states, setStates] = useState<FormatState[]>(
    allFormats.map((f, i) => ({
      id: f.id,
      status: i < 5 ? "em_producao" : "em_producao",
      edited: false,
    })),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [globalDraft, setGlobalDraft] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const applyGlobal = () => {
    if (!globalDraft.trim()) return;
    setShowConfirm(true);
  };

  const confirmGlobal = () => {
    setStates((prev) => prev.map((s) => ({ ...s, edited: true, status: "editado" })));
    setShowConfirm(false);
    setGlobalDraft("");
  };

  const selectedFormat = allFormats.find((f) => f.id === selected);
  const selectedState = states.find((s) => s.id === selected);

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col overflow-hidden bg-neutral-900">
        {/* Caixa de IA global */}
        <div className="border-b border-neutral-800 bg-neutral-900 p-4">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <span className="text-accent-500 text-lg">🤖</span>
            <input
              value={globalDraft}
              onChange={(e) => setGlobalDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyGlobal()}
              placeholder="Pedir ajuste em todos os formatos (ex: 'aumenta o logo em todos')"
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-accent-500"
            />
            <button
              onClick={applyGlobal}
              className="px-4 py-2 rounded-md bg-accent-500 text-white text-sm font-medium hover:bg-accent-600"
            >
              Aplicar
            </button>
          </div>
        </div>

        {/* Canvas com formatos */}
        <div className="flex-1 overflow-auto scrollbar-thin p-6">
          <div className="flex flex-wrap gap-6">
            {allFormats.map((f) => {
              const st = states.find((s) => s.id === f.id)!;
              const aspect = f.width / f.height;
              const w = aspect > 1.5 ? 280 : aspect > 0.8 ? 200 : 160;
              const h = w / aspect;
              const isSel = selected === f.id;
              return (
                <div
                  key={f.id}
                  className={[
                    "group relative cursor-pointer transition",
                    isSel && "ring-2 ring-accent-500 rounded-md",
                  ].join(" ")}
                  onClick={() => setSelected(f.id)}
                >
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200" style={{ width: w, height: h }}>
                    <div className="p-2 text-[10px] text-neutral-700">{f.width}×{f.height}</div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <span className="text-neutral-300 text-[10px]">{f.label.split("—")[0].trim()}</span>
                    <div className="flex items-center gap-1.5">
                      {st.edited && <span className="text-[9px] uppercase tracking-wide text-accent-400">editado</span>}
                      <StatusDot status={st.status} />
                    </div>
                  </div>

                  {/* 3 ações no hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                    <ActionButton title="Comentar IA">💬</ActionButton>
                    <ActionButton title="Editar manualmente">✏️</ActionButton>
                    <ActionButton title="Exportar">↓</ActionButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legenda + ações no rodapé */}
        <div className="border-t border-neutral-800 bg-neutral-900 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            {STATUS_LEGEND.map((s) => (
              <StatusDot key={s.status} status={s.status} withLabel />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-md border border-neutral-700 text-neutral-300 text-sm hover:bg-neutral-800">
              Exportar ZIP
            </button>
            <Link
              to={`/projeto/${id}/aprovacao`}
              className="px-4 py-2 rounded-md bg-accent-500 text-white text-sm font-medium hover:bg-accent-600"
            >
              Enviar para aprovação →
            </Link>
          </div>
        </div>
      </div>

      {/* Painel lateral do formato selecionado */}
      {selected && selectedFormat && selectedState && (
        <aside className="w-80 shrink-0 border-l border-neutral-200 bg-white flex flex-col overflow-hidden">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">{selectedFormat.label}</h3>
              <button onClick={() => setSelected(null)} className="text-neutral-400 hover:text-neutral-600">×</button>
            </div>
            <StatusDot status={selectedState.status} withLabel />
          </div>

          <div className="p-4 space-y-4 overflow-auto scrollbar-thin">
            <section>
              <h4 className="text-xs font-semibold uppercase text-neutral-500 mb-2">Camadas</h4>
              <ul className="space-y-1">
                {["Hero", "Headline", "Subheadline", "CTA", "Logo", "Aviso"].map((el) => (
                  <li key={el} className="flex items-center justify-between text-sm">
                    <span>{el}</span>
                    <button className="text-xs text-accent-600 hover:underline">💬 comentar</button>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-xs font-semibold uppercase text-neutral-500 mb-2">Comentário ao formato</h4>
              <textarea
                rows={3}
                placeholder="Ex: 'aumentar contraste do CTA'"
                className="w-full border border-neutral-300 rounded-md px-2 py-1.5 text-sm"
              />
              <button className="mt-2 w-full px-3 py-1.5 rounded-md bg-accent-500 text-white text-xs font-medium hover:bg-accent-600">
                🤖 Pedir ajuste à IA
              </button>
            </section>

            <section className="space-y-2 pt-2 border-t border-neutral-200">
              <button className="w-full px-3 py-2 rounded-md border border-neutral-300 text-sm hover:bg-neutral-50">
                ✏️ Editar manualmente
              </button>
              <button className="w-full px-3 py-2 rounded-md bg-neutral-900 text-white text-sm hover:bg-neutral-800">
                ↓ Exportar este formato
              </button>
            </section>
          </div>
        </aside>
      )}

      {/* Modal de confirmação do ajuste global */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-neutral-200">
              <h3 className="font-semibold">Confirmar ajuste global</h3>
              <p className="text-xs text-neutral-500 mt-1">A IA aplicará isso em todos os formatos:</p>
              <p className="mt-3 text-sm text-neutral-800 italic">"{globalDraft}"</p>
            </div>
            <div className="p-5 space-y-2 max-h-72 overflow-auto scrollbar-thin">
              {allFormats.slice(0, 4).map((f) => (
                <div key={f.id} className="rounded-md bg-neutral-50 p-3 text-xs">
                  <strong>{f.label.split("—")[0].trim()}:</strong> Logo escalado para 1.3× preservando posição relativa.
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-neutral-200 flex justify-end gap-2">
              <button onClick={() => setShowConfirm(false)} className="px-3 py-1.5 rounded-md text-sm hover:bg-neutral-100">
                Cancelar
              </button>
              <button onClick={confirmGlobal} className="px-3 py-1.5 rounded-md bg-accent-500 text-white text-sm hover:bg-accent-600">
                Confirmar e reprocessar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <button
      title={title}
      onClick={(e) => e.stopPropagation()}
      className="w-7 h-7 rounded-md bg-neutral-900/80 text-white text-xs hover:bg-neutral-900 backdrop-blur"
    >
      {children}
    </button>
  );
}
