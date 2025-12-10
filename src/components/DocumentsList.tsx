import { Document, User, Vendor } from "../types";

interface DocumentsListProps {
  documents: Document[];
  users: User[];
  vendors: Vendor[];
}

const formatFileSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (size >= 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${size} B`;
};

const DocumentsList = ({ documents, users, vendors }: DocumentsListProps) => {
  const userMap = Object.fromEntries(users.map((u) => [u.id, u.full_name]));
  const vendorMap = Object.fromEntries(vendors.map((v) => [v.id, v.name]));

  return (
    <div className="panel rounded-2xl shadow-lg p-5 space-y-4">
      <h3 className="text-lg font-semibold text-main">Documents</h3>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="rounded-xl panel-muted border border-[var(--border)] p-4 flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-main">{doc.filename}</p>
                <span className="text-[11px] text-main bg-[var(--card)] px-2 py-1 rounded-full border border-[var(--border)]">
                  {doc.file_type}
                </span>
              </div>
              <p className="text-sm text-muted mt-1">
                {formatFileSize(doc.file_size)} • Uploaded by {userMap[doc.uploaded_by]} •{" "}
                {new Date(doc.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-muted mt-1">
                Vendor: {doc.vendor_id ? vendorMap[doc.vendor_id] : "—"}
              </p>
              {doc.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-[var(--card-muted)] text-[11px] text-main border border-[var(--border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-xs text-muted">{doc.storage_key}</div>
          </div>
        ))}
        {documents.length === 0 && <p className="text-sm text-muted">No documents uploaded.</p>}
      </div>
    </div>
  );
};

export default DocumentsList;
