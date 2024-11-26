import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">404</h2>
        <h3 className="text-2xl font-semibold text-gray-600 mb-4">
          Page non trouvée
        </h3>
        <p className="text-gray-500 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white py-2 px-6 rounded hover:bg-primary/90 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
