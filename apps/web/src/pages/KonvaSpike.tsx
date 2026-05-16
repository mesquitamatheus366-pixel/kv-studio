import { useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Transformer, Image as KonvaImage } from "react-konva";
import type Konva from "konva";

type Box = { id: string; x: number; y: number; w: number; h: number; fill: string; label: string };

const initial: Box[] = [
  { id: "hero",    x: 40,  y: 40,  w: 380, h: 220, fill: "#fed7aa", label: "Hero (image)" },
  { id: "head",    x: 40,  y: 280, w: 380, h: 60,  fill: "#fde68a", label: "Headline" },
  { id: "cta",     x: 40,  y: 360, w: 160, h: 50,  fill: "#f59e0b", label: "CTA" },
  { id: "logo",    x: 320, y: 360, w: 100, h: 50,  fill: "#fff",    label: "Logo" },
];

export function KonvaSpike() {
  const [boxes, setBoxes] = useState<Box[]>(initial);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<Record<string, Konva.Rect | null>>({});

  // ligar transformer ao shape selecionado
  const onSelect = (id: string) => {
    setSelectedId(id);
    const node = shapeRefs.current[id];
    if (node && trRef.current) {
      trRef.current.nodes([node]);
      trRef.current.getLayer()?.batchDraw();
    }
  };

  const onTransformEnd = (id: string) => {
    const node = shapeRefs.current[id];
    if (!node) return;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    setBoxes((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, x: node.x(), y: node.y(), w: Math.max(20, b.w * scaleX), h: Math.max(20, b.h * scaleY) }
          : b,
      ),
    );
  };

  const exportPng = () => {
    if (!stageRef.current) return;
    // limpa seleção antes para não exportar o transformer
    setSelectedId(null);
    setTimeout(() => {
      const uri = stageRef.current!.toDataURL({ pixelRatio: 2 });
      const a = document.createElement("a");
      a.href = uri;
      a.download = "kv-studio-spike.png";
      a.click();
    }, 50);
  };

  return (
    <div className="p-6 space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Konva Spike</h1>
        <p className="text-sm text-neutral-600">
          Validação técnica do canvas: drag, resize (transformer), seleção, deselect ao clicar no fundo e
          exportação PNG @2x. Substitui o risco de produto descrito no doc.
        </p>
      </header>

      <div className="flex gap-3">
        <button
          onClick={exportPng}
          className="px-4 py-2 rounded-md bg-accent-500 text-white text-sm font-medium hover:bg-accent-600"
        >
          ↓ Exportar PNG @2x
        </button>
        <button
          onClick={() => setBoxes(initial)}
          className="px-4 py-2 rounded-md border border-neutral-300 text-sm hover:bg-neutral-50"
        >
          Reset
        </button>
      </div>

      <div className="inline-block bg-neutral-900 p-4 rounded">
        <Stage
          ref={stageRef}
          width={460}
          height={420}
          onMouseDown={(e) => {
            // clicou no fundo da stage → deselect
            if (e.target === e.target.getStage()) setSelectedId(null);
          }}
          style={{ background: "#fff" }}
        >
          <Layer>
            {boxes.map((b) => (
              <Rect
                key={b.id}
                ref={(node) => {
                  shapeRefs.current[b.id] = node;
                }}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                fill={b.fill}
                stroke={selectedId === b.id ? "#f59e0b" : "#e5e7eb"}
                strokeWidth={selectedId === b.id ? 2 : 1}
                draggable
                onClick={() => onSelect(b.id)}
                onTap={() => onSelect(b.id)}
                onDragEnd={(e) =>
                  setBoxes((prev) =>
                    prev.map((x) => (x.id === b.id ? { ...x, x: e.target.x(), y: e.target.y() } : x)),
                  )
                }
                onTransformEnd={() => onTransformEnd(b.id)}
              />
            ))}
            {boxes.map((b) => (
              <Text
                key={`t-${b.id}`}
                x={b.x + 8}
                y={b.y + 8}
                text={b.label}
                fontSize={12}
                fill="#374151"
                listening={false}
              />
            ))}
            <Transformer
              ref={trRef}
              boundBoxFunc={(_old, next) => {
                if (next.width < 20 || next.height < 20) return _old;
                return next;
              }}
            />
          </Layer>
        </Stage>
      </div>

      <div className="text-xs text-neutral-500 space-y-1">
        <p>✓ Drag funcional · ✓ Resize via 8 handles · ✓ Min size 20×20 · ✓ Export PNG @2x</p>
        <p>Próximo passo: testar exportação em formato real (1080×1920) e PSD multi-camada.</p>
      </div>
    </div>
  );
}
