import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center gap-4">
      <h1 className="text-white text-5xl">Dashboard</h1>
      <p className="text-gray-300">Bem-vindo, {session.user?.name}</p>
      <div className="flex flex-col gap-3">
        <Link href="/dashboard/upload" className="bg-white text-black px-4 py-2 rounded-md">
          Upload de Documento
        </Link>
        <Link href="/dashboard/documents" className="bg-white text-black px-4 py-2 rounded-md">
          Meus Documentos
        </Link>
        <form action="/api/auth/signout" method="POST">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 cursor-pointer" type="submit">
            Logout
          </button>
        </form>
      </div>
    </section>
  );
}
