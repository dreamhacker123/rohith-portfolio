import React from "react";
import { FolderKanban, Github } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="w-full min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black items-center justify-center py-16 px-4"
    >
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-10">
        <FolderKanban className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">Projects</h2>
      </div>

      <div className="w-full max-w-4xl">
        {/* "View more projects" card */}
        <a
          href="https://github.com/dreamhacker123"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black/60 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 md:p-8 hover:shadow-2xl hover:shadow-red-500/30 hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <Github className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
            <span className="text-xl md:text-2xl font-semibold text-gray-200">
              @dreamhacker123
            </span>
          </div>
          <p className="text-sm md:text-base text-gray-400 mt-4 md:mt-0">
            Click here to explore more projects on GitHub →
          </p>
        </a>
      </div>
    </section>
  );
};
