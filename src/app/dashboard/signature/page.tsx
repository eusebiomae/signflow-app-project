'use client'

import { useState } from 'react'

export default function UploadSignaturePage() {
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) return alert('Selecione um arquivo de imagem.')

    const formData = new FormData()
    formData.append('signature', file)

    const res = await fetch('/api/users/signature', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      alert('Assinatura enviada com sucesso!')
    } else {
      alert('Erro ao enviar assinatura.')
    }
  }

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl mb-4">Enviar Assinatura</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Enviar Assinatura
        </button>
      </form>
    </div>
  )
}
