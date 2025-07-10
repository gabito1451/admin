export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
      <a
        href="/dashboard"
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
