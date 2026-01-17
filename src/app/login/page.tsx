"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        alert("Credenciais inválidas");
      } else {
        router.push("/app/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-[440px] space-y-8 glass p-8 md:p-10 rounded-2xl shadow-2xl relative z-10 border-white/5 glow-cyan">
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <Zap className="h-7 w-7 text-primary shadow-sm" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Acesse o MINEIA
          </h2>
          <p className="text-sm text-slate-400">
            Entre com suas credenciais ou use o Google
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="block w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Senha
                </label>
                <Link href="#" className="text-[10px] font-bold text-primary/60 hover:text-primary uppercase tracking-tight">Esqueceu a senha?</Link>
              </div>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="block w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-white placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:bg-cyan-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Processando..." : (
              <>
                Entrar no Workspace
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5"></span>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest leading-none">
              <span className="bg-[#0f172a] px-3 text-slate-500">Ou continue com</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/app/dashboard" })}
            className="flex w-full justify-center items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Ainda não tem acesso?{" "}
            <Link href="/signup" className="font-bold text-primary hover:text-cyan-300 transition-colors border-b border-primary/20 hover:border-cyan-300">
              Criar Workspace
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
