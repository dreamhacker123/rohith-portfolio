import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

export const SocialMediaSection: React.FC = () => {
  return (
    <section
      id="social-media"
      className="flex w-full h-screen justify-center items-center bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300"
    >
      <div className="text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Connect with Me</h2>
        <p className="text-lg mb-8">
          Follow my creative and professional journey
        </p>

        <div className="flex justify-center items-center z-90 gap-6">
          {/* GitHub */}
          <a
            href="https://github.com/dreamhacker123"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 p-4 rounded-full shadow-md"
          >
            <Github className="w-8 h-8 text-white" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rohith-satya-nivas-muchakarla-02376917b/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 p-4 rounded-full shadow-md"
          >
            <Linkedin className="w-8 h-8 text-white" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/rohithsatyanivas.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 p-4 rounded-full shadow-md"
          >
            <Instagram className="w-8 h-8 text-white" />
          </a>
        </div>
        <footer className="text-center py-4 text-sm text-white">
  © 2025 Rohith Satya Nivas. All rights reserved.
</footer>

      </div>
    </section>
  );
};
