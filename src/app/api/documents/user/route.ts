import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/libs/db'

export async function GET() {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
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

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  return NextResponse.json(user.Document)
}
