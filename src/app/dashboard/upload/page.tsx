'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DocUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      router.push('/dashboard/documents')
    } else {
      alert('Erro ao fazer upload')
    }
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Upload de Documento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="text-black"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  )
}
