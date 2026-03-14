import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

export const SocialMediaSection: React.FC = () => {
  return (
    <section
      id="social-media"
      className="flex w-full min-h-screen md:h-screen justify-center items-center bg-gradient-to-br from-orange-500 via-orange-600 to-red-500"
    >
      <div className="text-white text-center px-4 py-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 drop-shadow-lg">Connect with Me</h2>
        <p className="text-base md:text-lg mb-8 text-gray-800">
          Follow my creative and professional journey
        </p>

        <div className="flex justify-center items-center z-90 gap-6">
          {/* GitHub */}
          <a
            href="https://github.com/dreamhacker123"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/80 hover:bg-gray-900 transition-all duration-300 p-4 rounded-2xl shadow-lg shadow-black/50 hover:shadow-black/70 transform hover:-translate-y-2 hover:scale-110 border border-gray-800 hover:border-gray-700"
          >
            <Github className="w-8 h-8 text-white" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rohith-satya-nivas-muchakarla-02376917b/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/80 hover:bg-gray-900 transition-all duration-300 p-4 rounded-2xl shadow-lg shadow-black/50 hover:shadow-black/70 transform hover:-translate-y-2 hover:scale-110 border border-gray-800 hover:border-gray-700"
          >
            <Linkedin className="w-8 h-8 text-white" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/rohithsatyanivas.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/80 hover:bg-gray-900 transition-all duration-300 p-4 rounded-2xl shadow-lg shadow-black/50 hover:shadow-black/70 transform hover:-translate-y-2 hover:scale-110 border border-gray-800 hover:border-gray-700"
          >
            <Instagram className="w-8 h-8 text-white" />
          </a>
        </div>
        <footer className="text-center py-4 text-sm text-gray-900">
  © 2025 Rohith Satya Nivas. All rights reserved.
</footer>

      </div>
    </section>
  );
};
