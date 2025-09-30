import ProjectCard from "../projects/projectCard";
import { projectList } from "../projects/projectList";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
          Machine Coding Projects
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A collection of frontend projects built to practice and showcase various web development concepts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-8 max-w-7xl">
        {projectList.map((prj, index) => (
          <ProjectCard
            key={index}
            index={index}
            route={prj.route}
            title={prj.title}
          />
        ))}
      </div>
    </main>
  );
}