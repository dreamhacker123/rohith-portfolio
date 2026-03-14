import React from "react";
import { motion } from "framer-motion";
import {
    Code,
    Cpu,
    Database,
    Hammer,
    BookOpen,
    Wrench,
    Settings,
} from "lucide-react";

const skills = [
  {
    title: "Languages",
    icon: <Code className="w-6 h-6 text-red-500" />,
    items: ["C/C++ (DSA)", "JavaScript", "TypeScript", "Python", "Swift", "SQL", "Shell"],
  },
  {
    title: "Web & Mobile Technologies",
    icon: <Cpu className="w-6 h-6 text-red-500" />,
    items: [
      "React",
      "React Native",
      "Next.js",
      "iOS Development",
      "Webpack",
      "NodeJS",
      "Express",
      "Sequelize",
      "Redis",
      "Redux",
      "AWS S3",
      "Lambdas",
      "API Gateway",
      "DynamoDB",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "Ant Design",
    ],
  },
  {
    title: "Database Technologies",
    icon: <Database className="w-6 h-6 text-red-500" />,
    items: ["PostgreSQL", "MySQL", "Firebase", "DynamoDB"],
  },
  {
    title: "Important Libraries",
    icon: <Hammer className="w-6 h-6 text-red-500" />,
    items: [
      "Axios",
      "Jest",
      "React Testing Library",
      "Lodash",
      "Multer",
      "Yup",
      "Fastest-validator",
      "Nock",
      "MSW",
      "TestCafe",
      "Verdaccio",
      "Storybook",
      "Socket.io",
    ],
  },
  {
    title: "CI/CD & Architecture",
    icon: <Settings className="w-6 h-6 text-red-500" />,
    items: ["Software Architecture", "Microservices", "Jenkins", "Docker", "Git", "Bitbucket", "Heroku"],
  },
  {
    title: "Other Tools & Software",
    icon: <Wrench className="w-6 h-6 text-red-500" />,
    items: [
      "Visual Studio Code",
      "Linux",
      "Postman",
      "Adobe Photoshop",
      "Adobe Illustrator",
    ],
  },
  {
    title: "Ongoing Certifications / Courses",
    icon: <BookOpen className="w-6 h-6 text-red-500" />,
    items: [
      "Micro-Frontends with React",
      "Web Development with Golang",
      "AWS Certified Cloud Practitioner",
      "Microservices with Node.js and React",
    ],
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="w-full min-h-screen flex flex-col items-center py-10 md:py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <motion.div
        className="text-2xl md:text-4xl w-full text-center font-bold mb-8 md:mb-12 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent flex flex-col md:flex-row items-center justify-center gap-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} 
        viewport={{ once: true }}
      >
        <Hammer className="inline-block font-bold mr-2 w-8 h-8 md:w-12 md:h-12 text-red-500" />
        <h2 className="text-2xl md:text-4xl">Skills</h2>
      </motion.div>

      <div className="columns-1 md:columns-2 lg:columns-3 z-90 gap-4 md:gap-6 max-w-6xl w-full">
  {skills.map((category, index) => (
    <motion.div
      key={category.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-4 md:mb-6 break-inside-avoid bg-black/60 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-2xl shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1 border border-red-500/30"
    >
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        {category.icon}
        <h3 className="text-lg md:text-xl font-semibold text-gray-200">
          {category.title}
        </h3>
      </div>
      <ul className="list-disc ml-5 space-y-1 text-gray-300 text-sm text-left">
        {category.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </motion.div>
  ))}
</div>

    </section>
  );
};
