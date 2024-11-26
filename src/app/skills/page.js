const skills = {
  frontend: [
    { name: "HTML5/CSS3", level: 90 },
    { name: "JavaScript/TypeScript", level: 85 },
    { name: "React/Next.js", level: 85 },
    { name: "TailwindCSS", level: 90 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "SQL/NoSQL", level: 70 },
    { name: "API REST", level: 85 },
  ],
  tools: [
    { name: "Git/GitHub", level: 85 },
    { name: "VS Code", level: 90 },
    { name: "Docker", level: 70 },
    { name: "CI/CD", level: 75 },
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
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700">{name}</span>
        <span className="text-gray-600">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12">Compétences</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Frontend</h2>
              {skills.frontend.map((skill, index) => (
                <SkillBar key={index} {...skill} />
              ))}
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Backend</h2>
              {skills.backend.map((skill, index) => (
                <SkillBar key={index} {...skill} />
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Outils</h2>
              {skills.tools.map((skill, index) => (
                <SkillBar key={index} {...skill} />
              ))}
            </section>
          </div>

          {/* Soft Skills */}
          <div>
            <section>
              <h2 className="text-2xl font-semibold mb-6">Soft Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {skills.softSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <span className="text-gray-700">{skill}</span>
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
