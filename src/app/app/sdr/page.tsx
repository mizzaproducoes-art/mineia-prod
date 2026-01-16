"use client";

import { Copy, MessageCircle, ArrowUpRight } from "lucide-react";

export default function SDRQueuePage() {
  const mockP1Leads = [
    { id: "101", title: "Onix 2019 Completo", status: "P1_CHAT", contact: "Chat OLX", urgency: "Alta" },
    { id: "105", title: "HB20 2021 Único Dono", status: "P1_CHAT", contact: "Chat Webmotors", urgency: "Média" },
  ];

  const copyScript = (scriptNum: number) => {
    const script = scriptNum === 1 
      ? "Olá! Vi seu anúncio e tenho interesse. Qual o melhor horário para conversarmos?"
      : "Boa tarde! O carro ainda está disponível? Tenho uma proposta.";
    navigator.clipboard.writeText(script);
    alert(`Script ${scriptNum} copiado!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Fila SDR (P1_CHAT)</h1>
          <p className="text-slate-400 text-sm mt-1">Leads que precisam de contato manual via chat da plataforma.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {mockP1Leads.map((lead) => (
          <div key={lead.id} className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-slate-200 group-hover:text-primary transition-colors">{lead.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase border border-orange-500/20">
                    {lead.urgency} Urgência
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-mono">ID: {lead.id} • Fonte: {lead.contact}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button 
                    onClick={() => copyScript(1)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border hover:border-primary/50 text-slate-400 hover:text-white rounded-lg text-xs font-medium transition-all"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar Script 1
                  </button>
                  <button 
                    onClick={() => copyScript(2)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border hover:border-primary/50 text-slate-400 hover:text-white rounded-lg text-xs font-medium transition-all"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar Script 2
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-surface rounded-xl text-sm font-bold hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all">
                  <MessageCircle className="h-4 w-4" />
                  Abrir Chat
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 border border-accent/30 text-accent rounded-xl text-sm font-bold hover:bg-accent/10 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                  MIGRATED_TO_WHATSAPP
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {mockP1Leads.length === 0 && (
          <div className="text-center py-16 bg-surface/50 border-2 border-dashed border-border rounded-xl">
            <p className="text-slate-500">Nenhum lead na fila P1_CHAT no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
