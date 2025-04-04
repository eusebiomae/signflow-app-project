'use client'

import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

type Props = {
  url: string
}

export default function PDFViewer({ url }: Props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <div className="h-[500px] border border-gray-600">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  )
}
