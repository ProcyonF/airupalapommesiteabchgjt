import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    title: "Portfolio Personnel",
    description: "Site web personnel créé avec Next.js et TailwindCSS, mettant en avant mes compétences et projets.",
    technologies: ["Next.js", "React", "TailwindCSS"],
    image: "/projects/portfolio.jpg",
    link: "https://github.com/airupalapomme/portfolio",
  },
  // Ajoutez vos autres projets ici
]

export default function Projects() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Mes Projets</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article key={index} className="card group hover:scale-105 transition-transform duration-200">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Voir le projet
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
