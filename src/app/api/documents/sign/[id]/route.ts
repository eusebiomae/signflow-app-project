import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/libs/db'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const signature = await db.signature.create({
    data: {
      docId: Number(params.id),
      userId: user.id,
      signatureImg: 'signed-by-' + user.username,
      signedAt: new Date(),
    },
  })

  await db.document.update({
    where: { id: Number(params.id) },
    data: { status: 'SIGNED' },
  })

  return NextResponse.json(signature)
}
