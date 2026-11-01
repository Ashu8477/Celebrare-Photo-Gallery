export default function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-xl rounded-lg border border-red-200 bg-red-50 p-6 text-center"
    >
      <p className="text-sm font-semibold text-red-700">Something went wrong</p>
      <p className="mt-1 text-sm text-red-600">{message || 'Unable to load photos. Please try again later.'}</p>
    </div>
  );
}
