"use client";

import { useState } from "react";
import { Save, Globe, Target, Calculator, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const [dryRun, setDryRun] = useState(true);

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações do Workspace</h1>
        <p className="text-gray-500 text-sm">Personalize os algoritmos e regras de negócio do MINEIA.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Geografia */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4 hover:border-border/80 transition-colors">
          <h3 className="font-bold flex items-center gap-2 text-white">
            <Globe className="h-4 w-4 text-primary" />
            Geografia de Operação
          </h3>
          <div className="space-y-1">
            <label htmlFor="geo-config" className="text-xs text-slate-400 font-medium ml-1">Cidades/Estados (JSON)</label>
            <textarea 
              id="geo-config"
              aria-label="Geografia de Operação"
              placeholder='["São Paulo", "Rio de Janeiro", "Curitiba"]'
              className="w-full h-32 p-3 bg-background border border-border rounded-xl font-mono text-xs text-slate-300 focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <p className="text-[10px] text-slate-500 italic">JSON com as cidades/estados permitidos para ingestão.</p>
        </div>

        {/* Keywords */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-4 hover:border-border/80 transition-colors">
          <h3 className="font-bold flex items-center gap-2 text-white">
            <Target className="h-4 w-4 text-primary" />
            Palavras-Chave (Interesse)
          </h3>
          <div className="space-y-1">
            <label htmlFor="keywords-config" className="text-xs text-slate-400 font-medium ml-1">Termos Prioritários (JSON)</label>
            <textarea 
              id="keywords-config"
              aria-label="Palavras-Chave de Interesse"
              placeholder='["único dono", "revisado", "laudo cautelar", "urgente"]'
              className="w-full h-32 p-3 bg-background border border-border rounded-xl font-mono text-xs text-slate-300 focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <p className="text-[10px] text-slate-500 italic">Termos que aumentam o score do lead se encontrados.</p>
        </div>

        {/* Thresholds */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-5 hover:border-border/80 transition-colors">
          <h3 className="font-bold flex items-center gap-2 text-white">
            <Calculator className="h-4 w-4 text-primary" />
            Limites de Scoring (Thresholds)
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="threshold-p0" className="text-slate-300">Mínimo para P0 (Crítico)</label>
              <input 
                id="threshold-p0"
                type="number" 
                defaultValue={0.8} 
                className="w-20 p-2 bg-background border border-border rounded-lg text-center text-white focus:border-primary outline-none" 
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="threshold-p1" className="text-slate-300">Mínimo para P1 (SDR)</label>
              <input 
                id="threshold-p1"
                type="number" 
                defaultValue={0.6} 
                className="w-20 p-2 bg-background border border-border rounded-lg text-center text-white focus:border-primary outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Global Flags */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm space-y-5 hover:border-border/80 transition-colors">
          <h3 className="font-bold flex items-center gap-2 text-white">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Modo Operacional
          </h3>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-tight text-slate-200">Dry Run</p>
              <p className="text-xs text-slate-500 mt-1">Apenas simula ações, não envia mensagens reais.</p>
            </div>
            <button 
              onClick={() => setDryRun(!dryRun)}
              aria-label={dryRun ? "Desativar Dry Run" : "Ativar Dry Run"}
              className={`w-14 h-7 rounded-full transition-all relative ${dryRun ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-sm ${dryRun ? 'left-8' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 bg-primary text-surface px-8 py-3 rounded-xl font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all shadow-md">
          <Save className="h-4 w-4" />
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
