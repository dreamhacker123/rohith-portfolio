import React, { useEffect, useState } from "react";
import { FolderKanban, Github } from "lucide-react";

type Repo = {
  updated_at: string | number | Date;
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
};

export const ProjectsSection: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/dreamhacker123/repos")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
  .filter((repo: Repo) => repo.description && repo.description.trim() !== "")
  .sort(
    (a: Repo, b: Repo) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )
  .slice(0, 6);

setRepos(filtered);

      });
  }, []);

  return (
    <section
      id="projects"
      className="w-full min-h-screen flex flex-col bg-white items-center py-10 px-4"
    >
      <div className="flex items-center gap-4 mb-8">
        <FolderKanban className="w-8 h-8 text-purple-600" />
        <h2 className="text-4xl font-bold themed-text-purple">Projects</h2>
        <a
          href="https://github.com/dreamhacker123"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <Github className="w-6 h-6 text-black" />
        </a>
      </div>

      <div className="grid grid-cols-1 z-80 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-50 rounded-xl shadow hover:shadow-md p-6 transition border border-purple-100"
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              {repo.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {repo.description || "No description provided."}
            </p>
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
              {repo.language || "Unknown"}
            </span>
          </a>
        ))}

        {/* Full-width "View more projects" card */}
        <a
          href="https://github.com/dreamhacker123"
          target="_blank"
          rel="noopener noreferrer"
          className="md:col-span-3 bg-purple-50 border border-purple-200 rounded-xl flex flex-col md:flex-row items-center justify-between p-6 hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <Github className="w-8 h-8 text-purple-800" />
            <span className="text-xl font-semibold text-purple-900">
              @dreamhacker123
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2 md:mt-0">
            Click here to explore more projects on GitHub →
          </p>
        </a>
      </div>
    </section>
  );
};
