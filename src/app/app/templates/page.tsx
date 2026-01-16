"use client";

import { useState } from "react";
import { Save, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function TemplatesPage() {
  const [p0Template, setP0Template] = useState("Olá, seu veículo ainda está disponível? [PARAR para cancelar]");
  const [p1Template, setP1Template] = useState("Vimos seu anúncio e temos interesse. [PARAR para não receber mais]");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!p0Template.toUpperCase().includes("PARAR") || !p1Template.toUpperCase().includes("PARAR")) {
      setError("ERRO LGPD: Todos os templates devem conter a palavra 'PARAR' para opt-out.");
      return;
    }
    setError("");
    alert("Templates salvos com sucesso!");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Templates de Mensagem</h1>
        <p className="text-slate-400 text-sm italic mt-1">Configuração obrigatória conforme normas LGPD.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400 font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2 text-white">
              Template P0 (Automático)
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </h3>
          </div>
          <textarea
            aria-label="Conteúdo do Template P0"
            className="w-full h-32 p-4 bg-background border border-border rounded-xl text-slate-200 focus:ring-1 focus:ring-primary outline-none resize-none placeholder:text-slate-600 font-mono text-sm"
            value={p0Template}
            onChange={(e) => setP0Template(e.target.value)}
          />
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2 text-white">
              Template P1 (SDR/Chat)
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </h3>
          </div>
          <textarea
            aria-label="Conteúdo do Template P1"
            className="w-full h-32 p-4 bg-background border border-border rounded-xl text-slate-200 focus:ring-1 focus:ring-primary outline-none resize-none placeholder:text-slate-600 font-mono text-sm"
            value={p1Template}
            onChange={(e) => setP1Template(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary text-surface px-8 py-3 rounded-xl font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
          >
            <Save className="h-4 w-4" />
            Salvar Templates
          </button>
        </div>
      </div>
    </div>
  );
}
