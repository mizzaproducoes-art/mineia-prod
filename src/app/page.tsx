import Link from "next/link";
import { ArrowRight, BarChart3, Inbox, MessageSquare, ShieldCheck, Zap, ChevronRight, Check } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navbar */}
      <header className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link className="flex items-center gap-3 group" href="#">
            <div className="h-8 w-8 bg-cyan-950/30 rounded-lg flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <div className="h-2.5 w-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-50 transition-colors">MINEIA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-cyan-400 transition-colors" href="#features">
              Recursos
            </Link>
            <Link className="text-sm font-medium hover:text-cyan-400 transition-colors" href="#pricing">
              Planos
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link className="text-sm font-medium hover:text-white transition-colors hidden sm:block" href="/login">
              Entrar
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-cyan-400 px-4 text-sm font-bold text-cyan-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:bg-cyan-300 hover:scale-105 active:scale-95"
            >
              Começar Grátis
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-48 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] -z-10" />

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                v1.0 Public Beta Live
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Gestão de Leads <br className="hidden md:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 selection:text-white">Inteligente & Autônoma</span>
              </h1>
              
              <p className="max-w-[640px] text-lg text-slate-400 leading-relaxed mx-auto">
                Automatize a ingestão, qualificação e operação de leads com o MINEIA. 
                A infraestrutura perfeita para times de alta performance conectados ao n8n.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-cyan-400 px-8 text-base font-bold text-cyan-950 shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all hover:bg-cyan-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
                >
                  Criar Workspace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-8 text-base font-medium text-white shadow-sm hover:bg-slate-800 transition-all hover:border-slate-600"
                >
                  Ver Demo
                </Link>
              </div>

              {/* Dashboard Preview */}
              <div className="mt-16 relative w-full max-w-5xl mx-auto rounded-xl border border-white/10 shadow-2xl bg-surface/50 backdrop-blur-sm p-3 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="rounded-lg overflow-hidden border border-white/5 bg-background h-[300px] md:h-[550px] relative">
                  {/* Browser Bar */}
                  <div className="h-10 border-b border-white/5 bg-surface/80 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                    </div>
                    <div className="flex-1 max-w-sm mx-auto h-5 bg-background/50 rounded-md border border-white/5" />
                  </div>
                  
                  {/* Mockup Dashboard Content */}
                  <div className="p-6 flex gap-6 h-full">
                    {/* Mock Sidebar */}
                    <div className="w-48 hidden md:block space-y-3">
                      <div className="h-8 w-full bg-primary/5 rounded-lg border border-primary/10" />
                      <div className="space-y-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="h-4 w-full bg-white/5 rounded-md" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Mock Main Content */}
                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-24 bg-surface rounded-xl border border-white/5 flex flex-col justify-center px-4">
                             <div className="h-2 w-12 bg-white/10 rounded mb-2" />
                             <div className="h-4 w-16 bg-primary/20 rounded" />
                          </div>
                        ))}
                      </div>
                      <div className="h-64 bg-surface rounded-xl border border-white/5 p-4">
                         <div className="h-4 w-32 bg-white/10 rounded mb-4" />
                         <div className="space-y-3">
                           {[1, 2, 3, 4].map(i => (
                             <div key={i} className="flex items-center gap-4">
                               <div className="h-8 w-8 bg-white/5 rounded-full" />
                               <div className="h-2 flex-1 bg-white/5 rounded" />
                               <div className="h-4 w-12 bg-accent/20 rounded-full" />
                             </div>
                           ))}
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Overlay Gradient for "Depth" */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 border-t border-white/5 bg-[#020617]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Built for Speed & Scale</h2>
              <p className="text-slate-400">
                Uma stack completa pensada para operações que não podem parar. Performance máxima e design premium.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Inbox, title: "Smart Inbox", desc: "Caixa de entrada unificada com filtros automáticos de prioridade e workflow visual." },
                { icon: BarChart3, title: "AI Scoring", desc: "Algoritmos proprietários para pontuar leads baseados em urgência e potencial de margem." },
                { icon: MessageSquare, title: "SDR Workflow", desc: "Fila de atendimento otimizada com templates rápidos e integração direta ao WhatsApp." },
                { icon: ShieldCheck, title: "LGPD Ready", desc: "Gestão de consentimento, DNC list e opt-out integrados nativamente." },
                { icon: Zap, title: "API First", desc: "API robusta para conectar com n8n, Zapier ou qualquer ferramenta de automação." },
                { icon: ChevronRight, title: "Webhooks", desc: "Receba notificações em tempo real para cada mudança de estado dos seus leads." },
              ].map((feature, i) => (
                <div key={i} className="group relative p-8 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-900/60 transition-all hover:border-cyan-500/30 overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <feature.icon className="h-24 w-24 text-white" />
                  </div>
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-white/5 bg-[#020617]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <Link className="flex items-center gap-2 mb-4" href="#">
                <div className="h-6 w-6 bg-cyan-950/50 rounded flex items-center justify-center border border-cyan-500/20">
                  <div className="h-2 w-2 bg-cyan-400 rounded-full" />
                </div>
                <span className="text-lg font-bold text-white">MINEIA</span>
              </Link>
              <p className="text-sm text-slate-500 max-w-xs">
                Infraestrutura de alta performance para gestão e conversão de leads automotivos.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Recursos</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Integrações</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">DPA</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
            <p className="text-xs text-slate-600">
              © 2026 MINEIA Inc. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-slate-500 font-mono">System Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
