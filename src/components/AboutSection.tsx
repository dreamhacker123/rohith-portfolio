import type { JSX } from "react";
import { GraduationCap, CalendarDays, MapPin, Mail, Phone } from "lucide-react";

export const AboutSection = (): JSX.Element => {
  return (
    <section
      id="about"
      className="h-screen flex flex-col bg-white items-end p-0 m-0"
    >
      <div className="flex flex-col w-[80%] justify-end items-center p-6">
        <h1 className="text-4xl font-bold themed-text-purple mb-6">About Me</h1>

        <p className="max-w-2xl text-center font-light font-[Rubik] text-gray-700 themed-text-purple mb-6">
          Hey, I’m <strong>Rohith Satya Nivas</strong> — a detail-driven and curious engineer who started off in{" "}
          <strong>Civil Engineering at IIT Madras</strong> and pivoted into the world of{" "}
          <strong>software development</strong>.
          <br /><br />
          With over <strong>2 years of experience</strong> in tech, I’ve contributed as a{" "}
          <strong>Full-Stack Developer</strong> in fast-paced startups across diverse domains like{" "}
          <strong>Cybersecurity</strong> and <strong>AI</strong>.
          <br /><br />
          When I’m not immersed in code, I channel my creativity into <strong>miniature art</strong>,{" "}
          <strong>pencil sketching</strong>, and sipping coffee while vibing to <strong>A.R. Rahman</strong> &{" "}
          <strong>Harris Jayaraj</strong>.
        </p>

        {/* Personal Info Column */}
        <div className="flex flex-col gap-4 mt-6 text-md font-[Rubik] text-gray-700 font-medium w-full max-w-2xl items-start">
  <div className="flex items-center gap-3">
    <GraduationCap className="w-5 h-5 text-purple-600" />
    <span>B.Tech in Civil Engineering, IIT Madras</span>
  </div>
  <div className="flex items-center gap-3">
    <CalendarDays className="w-5 h-5 text-purple-600" />
    <span>Birth: 17 January 2001</span>
  </div>
  <div className="flex items-center gap-3">
    <MapPin className="w-5 h-5 text-purple-600" />
    <span>Visakhapatnam, Andhra Pradesh, India</span>
  </div>
  <div className="flex items-center gap-3">
    <Mail className="w-5 h-5 text-purple-600" />
    <span>rohithsatyanivas@gmail.com</span>
  </div>
  <div className="flex items-center gap-3">
    <Phone className="w-5 h-5 text-purple-600" />
    <span>+91 7075539895</span>
  </div>
</div>

      </div>
    </section>
  );
};
