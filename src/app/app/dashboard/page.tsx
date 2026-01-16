import { BarChart3, Inbox, MessageSquare, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total de Leads", value: "2.543", icon: Inbox, color: "text-primary", change: "+12%" },
          { label: "Novos Hoje", value: "+124", icon: TrendingUp, color: "text-accent", change: "+5%" },
          { label: "P1_CHAT Pendente", value: "42", icon: MessageSquare, color: "text-orange-400", change: "-2%" },
          { label: "Taxa de Conversão", value: "12%", icon: BarChart3, color: "text-purple-400", change: "+0.4%" },
        ].map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
              <stat.icon className="h-12 w-12" />
            </div>
            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full bg-white/5 ${stat.change.startsWith("+") ? "text-accent" : "text-red-400"}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm min-h-[300px]">
          <h2 className="text-lg font-semibold mb-4">Leads Recentes</h2>
          <p className="text-sm text-gray-500">Nenhum lead processado recentemente.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm min-h-[300px]">
          <h2 className="text-lg font-semibold mb-4">Performance SDR</h2>
          <p className="text-sm text-gray-500">Aguardando dados...</p>
        </div>
      </div>
    </div>
  );
}
