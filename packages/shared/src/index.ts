// Tipos compartilhados entre frontend e backend.

export type Role = "junior" | "pleno" | "senior" | "revisora" | "gestor";

export type FormatStatus =
  | "em_producao" // cinza
  | "editado" //    laranja
  | "aprovado" //   verde
  | "revisado_ok" //   rosa claro
  | "revisora_ajuste"; // rosa choque

export interface Client {
  id: string;
  name: string;
  color: string; // accent por cliente na sidebar
  activeProjects: number;
}

export interface BrandKit {
  clientId: string;
  logos: Array<{ variant: "principal" | "negativo" | "horizontal" | "icone"; url: string }>;
  typography: { primary: string; secondary: string };
  palette: Array<{ hex: string; role: "arco" | "cta" | "fundo" | "headline" | "outro"; label: string }>;
  rules: string[]; // "arco sempre no topo", etc.
  completionPct: number;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  campaign: string;
  thumbnail?: string;
  updatedAt: string; // ISO
  formatCount: number;
  statusBreakdown: Record<FormatStatus, number>;
}

export interface KvElement {
  id: string;
  type: "image" | "text" | "logo" | "shape";
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  priority: "alta" | "media" | "baixa";
  locked?: boolean;
  visible?: boolean;
}

export interface FormatSpec {
  id: string;
  label: string;
  width: number;
  height: number;
  category: "google_ads" | "social" | "site" | "ooh" | "custom";
  suggested?: boolean;
}

export interface WireframeAnnotation {
  formatId: string;
  elementId: string;
  text: string;
  createdAt: string;
}
