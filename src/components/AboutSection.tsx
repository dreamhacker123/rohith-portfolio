import type { JSX } from "react";
import { GraduationCap, CalendarDays, MapPin, Mail, Phone } from "lucide-react";
import ModelViewer from "./ModelViewer";

export const AboutSection = (): JSX.Element => {
  return (
    <section
      id="about"
      className="min-h-screen h-auto md:h-screen flex flex-col md:flex-row bg-gradient-to-br from-black via-gray-900 to-black items-center md:items-stretch p-4 md:p-0 m-0 relative"
    >
      {/* 3D Model - Compact on mobile at top, full size on desktop on left */}
      <div className="w-full md:hidden px-6 mb-4">
        <div className="w-full h-[300px] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-transparent rounded-2xl"></div>
          <div className="w-full h-full border border-red-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-red-500/20">
            <ModelViewer />
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex md:w-[45%] lg:w-[40%] h-full items-center justify-center">
        <ModelViewer />
      </div>

      {/* About Content */}
      <div className="flex flex-col w-full md:w-[55%] lg:w-[60%] justify-center items-center p-6 md:p-8">
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl shadow-2xl shadow-red-500/20 p-6 md:p-8 border border-red-500/30">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">About Me</h1>

        <p className="max-w-2xl text-center font-light font-[Rubik] text-gray-300 mb-6 leading-relaxed">
          Hey, I’m <strong>Rohith Satya Nivas</strong> — a detail-driven and curious engineer who started off in{" "}
          <strong>Civil Engineering at IIT Madras</strong> and pivoted into the world of{" "}
          <strong>software development</strong>.
          <br /><br />
          With over <strong>3 years of experience</strong> in tech, I've contributed as a{" "}
          <strong>Full-Stack Developer</strong> in fast-paced startups across diverse domains like{" "}
          <strong>Cybersecurity</strong>, <strong>AI</strong>, and <strong>Food Tech</strong>. Currently, I'm building innovative solutions at{" "}
          <strong>Feast</strong>, a chef booking platform revolutionizing how people connect with culinary talent.
          <br /><br />
          When I’m not immersed in code, I channel my creativity into <strong>miniature art</strong>,{" "}
          <strong>pencil sketching</strong>, and sipping coffee while vibing to <strong>A.R. Rahman</strong> &{" "}
          <strong>Harris Jayaraj</strong>.
        </p>

        {/* Personal Info Column */}
        <div className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-6 text-sm md:text-md font-[Rubik] text-gray-300 font-medium w-full max-w-2xl items-start">
  <div className="flex items-center gap-2 md:gap-3 hover:bg-red-500/10 p-2 rounded-lg transition-colors border border-transparent hover:border-red-500/30">
    <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
    <span className="text-xs md:text-sm">B.Tech in Civil Engineering, IIT Madras</span>
  </div>
  <div className="flex items-center gap-2 md:gap-3 hover:bg-red-500/10 p-2 rounded-lg transition-colors border border-transparent hover:border-red-500/30">
    <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
    <span className="text-xs md:text-sm">Birth: 17 January 2001</span>
  </div>
  <div className="flex items-center gap-2 md:gap-3 hover:bg-red-500/10 p-2 rounded-lg transition-colors border border-transparent hover:border-red-500/30">
    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
    <span className="text-xs md:text-sm">Visakhapatnam, Andhra Pradesh, India</span>
  </div>
  <div className="flex items-center gap-2 md:gap-3 hover:bg-red-500/10 p-2 rounded-lg transition-colors border border-transparent hover:border-red-500/30">
    <Mail className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
    <span className="text-xs md:text-sm">rohithsatyanivas@gmail.com</span>
  </div>
  <div className="flex items-center gap-2 md:gap-3 hover:bg-red-500/10 p-2 rounded-lg transition-colors border border-transparent hover:border-red-500/30">
    <Phone className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
    <span className="text-xs md:text-sm">+91 7075539895</span>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};
