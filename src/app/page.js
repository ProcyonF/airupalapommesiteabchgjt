import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-950 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Airupalapomme
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in">
            Développeur Web Passionné par la Création d'Expériences Numériques Innovantes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#projects" className="btn btn-primary">
              Voir mes projets
            </a>
            <a href="#contact" className="btn btn-secondary">
              Me contacter
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              À propos de moi
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-secondary-600">
                Passionné par le développement web depuis plus de 5 ans, je crée des expériences numériques uniques et innovantes.
                Ma spécialité ? Transformer des idées complexes en interfaces intuitives et élégantes.
              </p>
              <p className="text-lg text-secondary-600">
                Je travaille principalement avec React, Next.js et Node.js, mais j'aime explorer de nouvelles technologies
                pour toujours rester à la pointe de l'innovation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-secondary-50 rounded-lg">
                <h3 className="font-bold text-xl mb-2 text-primary-600">Frontend</h3>
                <ul className="space-y-2 text-secondary-600">
                  <li>React</li>
                  <li>Next.js</li>
                  <li>Tailwind CSS</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div className="p-6 bg-secondary-50 rounded-lg">
                <h3 className="font-bold text-xl mb-2 text-primary-600">Backend</h3>
                <ul className="space-y-2 text-secondary-600">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>Firebase</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Mes Projets
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-secondary-100"></div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-secondary-900">Projet 1</h3>
                <p className="text-secondary-600 mb-4">
                  Description du projet 1. Une brève explication de ce que fait le projet
                  et des technologies utilisées.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                    Next.js
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-secondary-100"></div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-secondary-900">Projet 2</h3>
                <p className="text-secondary-600 mb-4">
                  Description du projet 2. Une brève explication de ce que fait le projet
                  et des technologies utilisées.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                    Node.js
                  </span>
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                    Express
                  </span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-secondary-100"></div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-secondary-900">Projet 3</h3>
                <p className="text-secondary-600 mb-4">
                  Description du projet 3. Une brève explication de ce que fait le projet
                  et des technologies utilisées.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                    Firebase
                  </span>
                  <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                    React
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Me Contacter
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="max-w-xl mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
