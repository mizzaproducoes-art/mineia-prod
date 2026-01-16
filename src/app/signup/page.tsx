import Link from "next/link";
import { Zap } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
        <Zap className="h-12 w-12 text-primary-600 mx-auto" />
        <h2 className="text-3xl font-bold tracking-tight">Crie sua conta</h2>
        <p className="text-gray-500">
          Inicie sua operação de leads hoje mesmo.
        </p>
        
        <div className="space-y-4 mt-8">
          <Link
            href="/login"
            className="block w-full rounded-md bg-primary-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Cadastrar com E-mail
          </Link>
          <button
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-3 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cadastrar com Google
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Ao se cadastrar, você concorda com nossos{" "}
          <Link href="/terms" className="text-primary-600 underline">Termos</Link> e{" "}
          <Link href="/privacy" className="text-primary-600 underline">Privacidade</Link>.
        </p>

        <p className="text-sm mt-4">
          Já tem conta?{" "}
          <Link href="/login" className="text-primary-600 font-semibold">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
