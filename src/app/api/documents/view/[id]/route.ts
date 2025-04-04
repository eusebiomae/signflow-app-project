import { NextResponse } from 'next/server'
import db from '@/libs/db'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const document = await db.document.findUnique({
    where: { id: Number(params.id) },
  })

  if (!document || !document.fileKey) {
    return NextResponse.json({ error: 'Documento não encontrado' }, { status: 404 })
  }

  const buffer = Buffer.from(document.fileKey, 'base64')

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${document.name}"`,
    },
  })
}
