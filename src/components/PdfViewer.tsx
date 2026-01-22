import { Viewer, Worker } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useEffect, useState } from 'react';

interface PdfViewer {
  file: File;
}

const PdfViewer = ({ file }: PdfViewer) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, CurrentScale } = zoomPluginInstance;

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFileUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!file) {
    return <p className="text-center mt-10">No PDF selected</p>;
  }

  if (!fileUrl) {
    return <p className="text-center mt-10">Preparing PDF…</p>;
  }

  return (
    <div style={{ height: '750px', border: '1px solid #e5e7eb' }}>
      <div className="flex items-center gap-3 p-2 border-b bg-gray-50">
        <ZoomOutButton />
        <CurrentScale />
        <ZoomInButton />
      </div>

      {/* viewer */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[zoomPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
