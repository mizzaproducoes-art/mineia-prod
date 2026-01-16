"use client";

import { 
  Key, 
  Webhook, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";

export default function IntegrationsPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existingKeys, setExistingKeys] = useState<any[]>([]);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const res = await fetch('/api/v1/keys');
      const data = await res.json();
      if (Array.isArray(data)) setExistingKeys(data);
    } catch (e) {
      console.error("Failed to fetch keys");
    }
  };

  const generateKey = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "n8n Integration" })
      });
      const data = await res.json();
      if (data.key) {
        setApiKey(data.key);
        fetchKeys();
      }
    } catch (e) {
      alert("Erro ao gerar chave");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Integrações</h1>
          <p className="text-slate-400 mt-2">Conecte o MINEIA ao seu ecossistema de automação.</p>
        </div>
        <button 
          onClick={generateKey}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-surface font-bold rounded-xl hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all shadow-sm disabled:opacity-50 disabled:hover:shadow-none"
        >
          <Zap className="h-4 w-4" />
          {isLoading ? "Gerando..." : "Gerar Nova Chave"}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* API Key Card */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:border-border/80 transition-colors">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
            <Key className="h-5 w-5 text-primary" />
            Sua API Key
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Use esta chave para autenticar requisições do n8n. <strong className="text-red-400">Mantenha-a em segredo!</strong>
          </p>
          
          {apiKey ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-background border border-border rounded-lg font-mono text-sm break-all group relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="flex-1 text-primary relative z-10">{apiKey}</span>
                <button 
                  onClick={() => copyToClipboard(apiKey)}
                  className="p-2 hover:bg-white/10 rounded-lg flex items-center gap-1 text-slate-400 hover:text-white transition-colors relative z-10"
                >
                  {isCopied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wide flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                Copie agora, você não verá esta chave novamente.
              </p>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-background/30">
              <p className="text-sm text-slate-500">Clique em "Gerar Nova Chave" para começar</p>
            </div>
          )}

          {existingKeys.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Chaves Ativas</h4>
              <div className="space-y-2">
                {existingKeys.map((key: any) => (
                  <div key={key.id} className="flex justify-between items-center text-sm p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-border/50">
                    <span className="font-medium text-slate-300">{key.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Final ••••{key.hashedKey.slice(-4)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Endpoints Documentation */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:border-border/80 transition-colors">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
            <Webhook className="h-5 w-5 text-primary" />
            Endpoints para n8n
          </h3>
          <div className="space-y-4">
            <div className="block p-4 border border-border bg-background/30 rounded-xl hover:border-primary/30 transition-all group">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold uppercase text-slate-500">POST</p>
                <div className="h-1.5 w-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
              </div>
              <p className="text-sm font-mono text-primary-200 group-hover:text-primary transition-colors">/api/v1/leads/ingest</p>
              <p className="text-xs text-slate-500 mt-2 italic">Ingestão de novos anúncios capturados.</p>
            </div>
            <div className="block p-4 border border-border bg-background/30 rounded-xl hover:border-orange-500/30 transition-all group">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold uppercase text-slate-500">POST</p>
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500/20 group-hover:bg-orange-500 transition-colors" />
              </div>
              <p className="text-sm font-mono text-orange-200 group-hover:text-orange-400 transition-colors">/api/v1/leads/[id]/score</p>
              <p className="text-xs text-slate-500 mt-2 italic">Atualização de inteligência via Gemini.</p>
            </div>
            <div className="block p-4 border border-border bg-background/30 rounded-xl hover:border-blue-500/30 transition-all group">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold uppercase text-slate-500">POST</p>
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
              </div>
              <p className="text-sm font-mono text-blue-200 group-hover:text-blue-400 transition-colors">/api/v1/leads/[id]/events</p>
              <p className="text-xs text-slate-500 mt-2 italic">Registro de ações (ex: WhatsApp Enviado).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
