import { supabaseDownload } from 'utils/supabase';

const downloadBlob = (blob: Blob, fileName: string): void => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

export default async (patchedDocument: string) => {
  const patchedDocumentBlob = await supabaseDownload(patchedDocument);

  if (patchedDocumentBlob) {
    downloadBlob(patchedDocumentBlob, patchedDocument);
  }
};
