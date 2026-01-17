import { prisma } from "@/lib/db";
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldAlert, 
  UserPlus, 
  History, 
  BarChart, 
  Clock
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      events: {
        orderBy: { createdAt: "desc" },
        include: { user: true }
      },
      assignedTo: true
    }
  });

  if (!lead) return notFound();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "P0": return "text-red-500 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
      case "P1": return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "P2": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "DNC": return "text-slate-400 bg-slate-800 border-slate-700 line-through decoration-slate-600";
      default: return "text-slate-400 bg-slate-800 border-slate-700";
    }
  };

  return (
    <div className="space-y-8">
      <Link href="/app/leads" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors hover:-translate-x-1 duration-200">
        <ArrowLeft className="h-4 w-4" />
        Voltar para Inbox
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="flex-1 space-y-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{lead.title}</h1>
            <span className={`self-start px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusColor(lead.status)}`}>
              {lead.status}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-slate-400 font-mono">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {lead.createdAt.toLocaleDateString()}</span>
            <span className="text-slate-600">|</span>
            <span>ID: <span className="text-slate-300">{lead.id}</span></span>
            <span className="text-slate-600">|</span>
            <span className="font-bold text-primary">{lead.source}</span>
          </div>

          <div className="flex gap-3">
            {lead.url && (
              <a 
                href={lead.url} 
                target="_blank" 
                className="flex items-center gap-2 px-6 py-2.5 bg-surface border border-border rounded-xl text-sm font-semibold text-white hover:border-primary/50 hover:bg-white/5 transition-all shadow-sm group"
              >
                <ExternalLink className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" /> Ver Anúncio
              </a>
            )}
            <button className="flex items-center gap-2 px-6 py-2.5 bg-red-950/30 text-red-400 border border-red-900/50 rounded-xl text-sm font-semibold hover:bg-red-950/50 hover:border-red-500/50 transition-all shadow-sm">
              <ShieldAlert className="h-4 w-4" /> Marcar DNC
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {/* Lead Details Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm relative overflow-hidden group hover:border-border/80 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                <BarChart className="h-5 w-5 text-primary" />
                Inteligência & Scores
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-4 bg-background border border-border rounded-xl hover:border-primary/30 transition-colors">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Urgência</p>
                    <p className="text-2xl font-bold text-white">8.5</p>
                  </div>
                  <div className="p-4 bg-background border border-border rounded-xl hover:border-primary/30 transition-colors">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Margem</p>
                    <p className="text-lg font-bold text-accent">R$ 5k</p>
                  </div>
                  <div className="p-4 bg-background border border-border rounded-xl hover:border-primary/30 transition-colors">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Risco</p>
                    <p className="text-lg font-bold text-green-400">Baixo</p>
                  </div>
                </div>
                <div className="bg-background/50 border border-border/50 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-primary uppercase mb-2 tracking-wide">Análise AI</h4>
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    "Veículo abaixo da tabela FIPE com descrição indicando urgência de venda ('Mudando de país'). Keywords detectadas sugerem oportunidade P0."
                  </p>
                </div>
              </div>
            </div>

            {/* SDR Assignment Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:border-border/80 transition-colors">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-white">
                <UserPlus className="h-5 w-5 text-primary" />
                Atribuição SDR
              </h3>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-background border border-border flex items-center justify-center shadow-sm">
                  {lead.assignedTo?.name?.[0] || <UserPlus className="h-6 w-6 text-slate-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-lg">{lead.assignedTo?.name || "Sem atribuição"}</p>
                  <p className="text-sm text-slate-500">{lead.assignedTo?.email || "Clique para atribuir um SDR"}</p>
                </div>
              </div>
              <button className="w-full mt-6 py-3 border border-dashed border-slate-700 rounded-xl text-sm font-medium text-slate-400 hover:border-primary hover:text-primary transition-all bg-transparent hover:bg-primary/5">
                Alterar Responsável
              </button>
            </div>
          </div>
        </div>

        {/* History / Timeline Sidebar */}
        <div className="w-full lg:w-96 bg-surface border border-border rounded-xl p-6 shadow-sm self-stretch">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-border pb-4 text-white">
            <History className="h-5 w-5 text-primary" />
            Histórico de Eventos
          </h3>
          <div className="space-y-8 pl-2">
            {lead.events.map((event: any) => (
              <div key={event.id} className="relative pl-8 border-l border-border last:border-0 group">
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-background border border-primary group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all" />
                <p className="text-xs font-bold uppercase text-primary tracking-wide mb-1 opacity-80 group-hover:opacity-100">{event.type}</p>
                <p className="text-sm text-slate-300 leading-snug bg-background/50 p-2 rounded-lg border border-transparent group-hover:border-border/50 transition-colors">{event.payloadJson?.toString() || "Ação realizada"}</p>
                <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {event.createdAt.toLocaleTimeString()} por <span className="text-slate-400">{event.user?.name || "Sistema"}</span>
                </p>
              </div>
            ))}
            {lead.events.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-8 italic opacity-60">Nenhum evento registrado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
