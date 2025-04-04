import db from '@/libs/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function MyDocsPage() {
  const session = await getServerSession()

  if (!session || !session.user?.email) {
    redirect('/auth/login')
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      Document: {
        include: {
          signatures: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  })

  if (!user) return <div>Usuário não encontrado</div>

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Meus Documentos</h2>
      <ul className="space-y-6">
        {user.Document.map((doc) => (
          <li key={doc.id} className="bg-gray-900 p-4 rounded-lg shadow">
            <p><strong>Nome:</strong> {doc.name}</p>
            <p><strong>Status:</strong> {doc.status}</p>
            <Link
              href={`/api/documents/view/${doc.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visualizar PDF
            </Link>

            {doc.status === 'PENDING' && (
              <form action={`/api/documents/sign/${doc.id}`} method="POST">
                <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white cursor-pointer">
                  Assinar Documento
                </button>
              </form>
            )}

            {doc.signatures.length > 0 && (
              <div className="mt-6 bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Assinaturas</h3>
                <ul className="space-y-3">
                  {doc.signatures.map((sig) => (
                    <li key={sig.id} className="flex items-center gap-4">
                      <div>
                        <p>
                          <strong>{sig.user.username}</strong> assinou em{" "}
                          {new Date(sig.signedAt).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
