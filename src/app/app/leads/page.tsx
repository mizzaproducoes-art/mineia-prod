import { Search, Filter, MoreHorizontal, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function LeadsInboxPage() {
  const mockLeads = [
    { id: "1", title: "VW Gol 2013 1.6", status: "P0", price: "R$ 32.900", source: "OLX", city: "São Paulo", state: "SP" },
    { id: "2", title: "Fiat Palio 2015", status: "P1", price: "R$ 28.500", source: "Webmotors", city: "Rio de Janeiro", state: "RJ" },
    { id: "3", title: "Ford Ka 2018", status: "P2", price: "R$ 45.000", source: "OLX", city: "Curitiba", state: "PR" },
    { id: "4", title: "Toyota Corolla 2020", status: "DNC", price: "R$ 110.000", source: "Marketplace", city: "Campinas", state: "SP" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "P0": return "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
      case "P1": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "P2": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "DISCARD": return "bg-slate-800 text-slate-400 border-slate-700";
      case "DNC": return "bg-slate-900 border-slate-700 text-slate-500 line-through decoration-slate-600";
      default: return "bg-slate-800 text-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Leads Inbox</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filtros
          </button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Buscar por título, cidade ou ID..."
          className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-background/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-4">Lead</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Preço</th>
              <th className="px-6 py-4">Fonte</th>
              <th className="px-6 py-4">Localização</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{lead.title}</span>
                    <span className="text-xs text-slate-500 font-mono">#{lead.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase ${getStatusColor(lead.status)} shadow-sm`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300 font-mono">{lead.price}</td>
                <td className="px-6 py-4 text-sm font-medium text-primary">{lead.source}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{lead.city}, {lead.state}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/app/leads/${lead.id}`} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors" aria-label="Mais ações">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
