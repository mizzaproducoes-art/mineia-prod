"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Inbox, 
  Users, 
  Settings, 
  Zap, 
  Layers, 
  LayoutDashboard,
  LogOut,
  Files,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/app/leads", icon: Inbox },
  { name: "Fila SDR", href: "/app/sdr", icon: Activity },
  { name: "Templates", href: "/app/templates", icon: Files },
  { name: "Integrações", href: "/app/integrations", icon: Zap },
  { name: "Configurações", href: "/app/settings", icon: Settings },
  { name: "Jobs", href: "/app/jobs", icon: Layers },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-surface text-slate-300 w-64 border-r border-border">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-surface rounded-lg flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <div className="h-3 w-3 bg-primary rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MINEIA</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive 
                  ? "bg-primary/10 text-primary shadow-sm border border-primary/10" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-slate-500 group-hover:text-slate-300")} />
              <span className="relative z-10">{item.name}</span>
              {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-l-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </div>
  );
}
