import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

type Experience = {
  role: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  skills: string[];
  color: string;
};

const experiences: Experience[] = [
  {
    role: "Software Development Engineer",
    company: "Feast LLC",
    duration: "Dec 2025 – Present · 4 mos",
    location: "New York, United States",
    type: "Full-time",
    skills: [
      "iOS Development",
      "Software Architecture",
      "React Native",
      "Next.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "TypeScript",
      "AWS",
    ],
    color: "#ef4444",
  },
  {
    role: "SDE",
    company: "ADALINE AI",
    duration: "Jan 2025 – Mar 2025 · 3 mos",
    location: "Bengaluru, Karnataka, India",
    type: "Contract",
    skills: [
      "Python",
      "Machine Learning",
      "AI Development",
      "TypeScript",
      "React.js",
    ],
    color: "#8b5cf6",
  },
  {
    role: "SDE",
    company: "Safe Security",
    duration: "Jun 2022 – Nov 2023 · 1 yr 6 mos",
    location: "Bengaluru, Karnataka, India",
    type: "Full-time",
    skills: [
      "Node.js",
      "TypeScript",
      "React.js",
      "Express.js",
      "Agile Methodologies",
      "AWS",
      "Back-End Web Development",
      "Scrum",
    ],
    color: "#3b82f6",
  },
  {
    role: "Technical Intern",
    company: "Cunomial Technologies",
    duration: "Jun 2021 – Jul 2021 · 2 mos",
    location: "Bengaluru, Karnataka, India",
    type: "Internship",
    skills: ["React.js", "Express.js", "Redux.js"],
    color: "#10b981",
  },
  {
    role: "Frontend Engineer Intern",
    company: "IIT Madras IC&SR",
    duration: "Apr 2021 – Jun 2021 · 3 mos",
    location: "Chennai, Tamil Nadu, India",
    type: "Internship",
    skills: ["Bootstrap", "HTML", "CSS", "JavaScript"],
    color: "#f59e0b",
  },
];

export const ProfessionalExperienceSection: React.FC = () => {
  return (
    <section
      id="professional-experience"
      className="flex flex-col md:flex-row justify-around w-full m-0 p-0 min-h-screen md:h-fit items-center py-12 mt-5 px-4 bg-gradient-to-br from-black via-gray-900 to-black"
    >
        <div className="flex flex-col text-red-500 items-center md:basis-1/3 mb-6 md:mb-0">
        <Briefcase className="w-8 h-8 md:w-12 md:h-12" />
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 flex items-center gap-2 text-center bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
          Professional Experience
        </h2>
        </div>
        <div className="flex flex-col w-full basis-1/2 space-y-6 z-50">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="border-l-4 border-red-500 pl-6 py-4 bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1 border border-red-500/30"
            >
              <div className="flex items-start gap-4 text-left">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-red-500/50 shrink-0 shadow-lg shadow-red-500/20"
                  style={{ backgroundColor: exp.color }}
                >
                  {exp.company.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-200">
                    {exp.role}{" "}
                    <span className="text-sm text-gray-400">({exp.type})</span>
                  </h3>
                  <p className="text-gray-300 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.duration}</p>
                  <p className="text-sm text-gray-400 mb-2">{exp.location}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-red-500/20 text-red-400 text-xs font-medium px-3 py-1 rounded-full border border-red-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
    </section>
  );
};
