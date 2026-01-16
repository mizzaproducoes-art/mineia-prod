import { Sidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
          <div className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Workspace: <span className="text-primary-600">Padrão</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {session.user?.email}
            </div>
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs uppercase">
              {session.user?.email?.[0] || "U"}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
