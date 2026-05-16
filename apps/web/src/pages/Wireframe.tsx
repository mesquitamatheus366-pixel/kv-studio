import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockFormats } from "../data/mocks";
import { useUI } from "../lib/store";

type Annotation = { formatId: string; element: string; text: string };

const ELEMENTS_READING: Record<string, string> = {
  f1: "topo → hero → headline → cta → logo",
  f2: "hero → headline → cta",
  f3: "logo → headline → cta",
  f4: "hero full → headline → cta → aviso",
  f5: "logo → hero → headline+cta",
};

export function Wireframe() {
  const { id } = useParams();
  const { selectedFormatIds } = useUI();
  const formats = mockFormats.filter((f) => selectedFormatIds.includes(f.id));

  const [annotations, setAnnotations] = useState<Annotation[]>([
    { formatId: "f1", element: "Hero", text: "priorizar o rosto no crop" },
  ]);
  const [modal, setModal] = useState<{ formatId: string; element: string } | null>(null);
  const [draftText, setDraftText] = useState("");

  const openModal = (formatId: string, element: string) => {
    setModal({ formatId, element });
    const existing = annotations.find((a) => a.formatId === formatId && a.element === element);
    setDraftText(existing?.text ?? "");
  };

  const saveAnnotation = () => {
    if (!modal) return;
    setAnnotations((prev) => {
      const others = prev.filter((a) => !(a.formatId === modal.formatId && a.element === modal.element));
      return draftText.trim() ? [...others, { ...modal, text: draftText.trim() }] : others;
    });
    setModal(null);
  };

  const elementsForFormat = ["Logo", "Hero", "Headline", "CTA", "Aviso"];

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-auto scrollbar-thin">
        <div className="p-6 space-y-4">
          <header className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Wireframe anotado</h1>
              <p className="text-sm text-neutral-500 mt-1">
                Clique em qualquer elemento para deixar uma orientação em linguagem natural.
              </p>
            </div>
            <Link
              to={`/projeto/${id}/dialogo`}
              className="px-4 py-2 rounded-md bg-accent-500 text-white text-sm font-medium hover:bg-accent-600"
            >
              Confirmar com a IA →
            </Link>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {formats.map((f) => {
              const aspect = f.width / f.height;
              const w = aspect > 1.5 ? 360 : aspect > 0.8 ? 220 : 180;
              const h = w / aspect;
              return (
                <div key={f.id} className="rounded-xl border border-neutral-200 bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{f.label}</span>
                    <span className="text-neutral-400">{f.width}×{f.height}</span>
                  </div>
                  <div className="bg-neutral-50 border border-dashed border-neutral-300 mx-auto relative" style={{ width: w, height: h }}>
                    {elementsForFormat.map((el, i) => {
                      const hasAnnot = annotations.some((a) => a.formatId === f.id && a.element === el);
                      const top = (i / elementsForFormat.length) * (h - 40) + 8;
                      return (
                        <button
                          key={el}
                          onClick={() => openModal(f.id, el)}
                          className={[
                            "absolute left-3 right-3 rounded text-[10px] text-left px-2 py-1 transition",
                            hasAnnot
                              ? "bg-accent-100 border border-accent-500 text-accent-700"
                              : "bg-white border border-neutral-300 text-neutral-600 hover:border-accent-400",
                          ].join(" ")}
                          style={{ top }}
                        >
                          {el}
                          {hasAnnot && <span className="float-right text-accent-500">●</span>}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-neutral-400 italic">
                    Leitura: {ELEMENTS_READING[f.id] ?? "—"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar de orientações */}
      <aside className="w-80 shrink-0 border-l border-neutral-200 bg-white p-4 overflow-auto scrollbar-thin">
        <h3 className="text-sm font-semibold mb-3">Orientações deixadas</h3>
        {annotations.length === 0 ? (
          <p className="text-xs text-neutral-500">Nenhuma orientação ainda. Clique em um elemento.</p>
        ) : (
          <ul className="space-y-2">
            {annotations.map((a, i) => {
              const fmt = mockFormats.find((f) => f.id === a.formatId);
              return (
                <li key={i} className="rounded-md border border-neutral-200 p-3 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-[10px]">{fmt?.label.split("—")[0].trim()}</span>
                    <span className="text-neutral-500">{a.element}</span>
                  </div>
                  <p className="text-neutral-700">"{a.text}"</p>
                </li>
              );
            })}
          </ul>
        )}
      </aside>

      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-5 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div>
              <h3 className="font-semibold">{modal.element}</h3>
              <p className="text-xs text-neutral-500 mt-1">
                O que a IA fez aqui: <em>Crop priorizou mãos + maço — produto em cena.</em>
              </p>
            </div>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder='Ex: "priorizar o rosto no crop"'
              rows={4}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setModal(null)} className="px-3 py-1.5 rounded-md text-sm hover:bg-neutral-100">
                Cancelar
              </button>
              <button onClick={saveAnnotation} className="px-3 py-1.5 rounded-md bg-accent-500 text-white text-sm hover:bg-accent-600">
                Salvar orientação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
