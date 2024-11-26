export default function About() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">À propos</h1>
        
        <div className="prose lg:prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Mon Parcours</h2>
            <p className="text-gray-600 mb-6">
              Passionné par le développement web, je crée des expériences numériques innovantes
              qui combinent design moderne et performances optimales. Mon approche est centrée
              sur l'utilisateur, avec un souci constant de la qualité et des détails.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Ma Vision</h2>
            <p className="text-gray-600 mb-6">
              Je crois en la création de solutions web qui non seulement répondent aux besoins
              actuels mais anticipent aussi les évolutions futures. Chaque projet est une
              opportunité d'innover et d'apprendre.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Mes Valeurs</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>Innovation constante et veille technologique</li>
              <li>Qualité et attention aux détails</li>
              <li>Communication transparente et collaboration efficace</li>
              <li>Apprentissage continu et partage des connaissances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">En dehors du code</h2>
            <p className="text-gray-600">
              Quand je ne code pas, vous me trouverez probablement en train d'explorer de
              nouvelles technologies, de contribuer à des projets open source ou de partager
              mes connaissances avec la communauté des développeurs.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
