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
  logo: string;
};

const experiences: Experience[] = [
  {
    role: "Full Stack Generalist Engineer",
    company: "Adaline AI",
    duration: "Apr 2025 – Jun 2025 · 3 mos",
    location: "Bengaluru, Karnataka, India · Remote",
    type: "Full-time",
    skills: ["React.js", "Tailwind CSS", "Express.js", "Node.js", "TypeScript"],
    logo: "https://res.cloudinary.com/dqsxhtkyo/image/upload/v1752363270/adaline_logo_xojkri.jpg",
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
    logo: "https://res.cloudinary.com/dqsxhtkyo/image/upload/v1752363229/images_e39p8c.png",
  },
  {
    role: "Technical Intern",
    company: "Cunomial Technologies",
    duration: "Jun 2021 – Jul 2021 · 2 mos",
    location: "Bengaluru, Karnataka, India",
    type: "Internship",
    skills: ["React.js", "Express.js", "Redux.js"],
    logo: "https://res.cloudinary.com/dqsxhtkyo/image/upload/v1752363339/cunomial_logo_tgvom4.jpg",
  },
  {
    role: "Frontend Engineer Intern",
    company: "IIT Madras IC&SR",
    duration: "Apr 2021 – Jun 2021 · 3 mos",
    location: "Chennai, Tamil Nadu, India",
    type: "Internship",
    skills: ["Bootstrap", "HTML", "CSS", "JavaScript"],
    logo: "https://res.cloudinary.com/dqsxhtkyo/image/upload/v1752363301/IIT_Madras_Logo_dydrio.svg",
  },
];

export const ProfessionalExperienceSection: React.FC = () => {
  return (
    <section
      id="professional-experience"
      className="flex flex-row justify-around w-full m-0 p-0 h-fit items-center py-6 mt-5 px-3"
      style={{
        background: `linear-gradient(162deg, transparent 87.1%, #facc15 87.1%)`, // tailwind yellow-400
      }}
    >
        <div className="flex flex-col text-white items-center basis-1/3">
        <Briefcase className="w-12 h-12" />
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-2">
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
              className="border-l-4 border-purple-800 pl-4 py-4 bg-white rounded-md shadow-sm"
            >
              <div className="flex items-start gap-4 text-left">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {exp.role}{" "}
                    <span className="text-sm text-gray-500">({exp.type})</span>
                  </h3>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full"
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
