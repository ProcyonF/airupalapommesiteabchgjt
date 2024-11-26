'use client'
 
export default function GlobalError({
  error,
  reset,
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Erreur critique
            </h2>
            <p className="text-gray-600 mb-6">
              Une erreur critique est survenue. Veuillez réessayer ultérieurement.
            </p>
            <button
              onClick={() => reset()}
              className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
