import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import db from '@/libs/db'

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const newDoc = await db.document.create({
    data: {
      name: file.name,
      fileKey: buffer.toString('base64'),
      userId: user.id,
    },
  })

  return NextResponse.json(newDoc)
}
