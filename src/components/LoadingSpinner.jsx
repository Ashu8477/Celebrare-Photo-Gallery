export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20" role="status" aria-live="polite">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800"
        aria-hidden="true"
      />
      <p className="text-sm text-gray-500">Loading photos…</p>
    </div>
  );
}
