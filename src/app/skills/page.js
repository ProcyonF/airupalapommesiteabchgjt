'use client'

const skills = {
  frontend: [
    { name: "HTML/CSS", level: 35 },
    { name: "JavaScript", level: 30 },
    { name: "React/Next.js", level: 20 },
    { name: "TailwindCSS", level: 15 },
  ],
  backend: [
    { name: "Python", level: 40 },
    { name: "Node.js", level: 25 },
    { name: "SQL/NoSQL", level: 20 },
    { name: "API REST", level: 15 },
  ],
  tools: [
    { name: "Git/GitHub", level: 35 },
    { name: "VS Code", level: 30 },
    { name: "Docker", level: 20 },
    { name: "CI/CD", level: 15 },
  ],
  softSkills: [
    "Travail d'équipe",
    "Communication",
    "Résolution de problèmes",
    "Autonomie",
    "Veille technologique",
    "Gestion de projet",
  ]
}

function SkillBar({ name, level }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-white/80">{level}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm">
        <div
          className="h-3 rounded-full transition-all duration-500 relative overflow-hidden bg-gradient-to-r from-white/80 to-white"
          style={{ width: `${level}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-white text-center">Compétences</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <section className="mb-12 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-6 text-white">Frontend</h2>
              {skills.frontend.map((skill, index) => (
                <SkillBar key={index} {...skill} />
              ))}
              <div className="mt-4 text-sm text-white/60 text-center">Total: 100%</div>
            </section>

            <section className="mb-12 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-6 text-white">Backend</h2>
              {skills.backend.map((skill, index) => (
                <SkillBar key={index} {...skill} />
              ))}
              <div className="mt-4 text-sm text-white/60 text-center">Total: 100%</div>
            </section>

            <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-6 text-white">Outils</h2>
              {skills.tools.map((skill, index) => (
                <SkillBar key={index} {...skill} />
              ))}
              <div className="mt-4 text-sm text-white/60 text-center">Total: 100%</div>
            </section>
          </div>

          {/* Soft Skills */}
          <div>
            <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-6 text-white">Soft Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {skills.softSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
