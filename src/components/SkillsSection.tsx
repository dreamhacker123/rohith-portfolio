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
    icon: <Code className="w-6 h-6 text-purple-600" />,
    items: ["C/C++ (DSA)", "JavaScript", "Python", "SQL", "Shell"],
  },
  {
    title: "Web Technologies",
    icon: <Cpu className="w-6 h-6 text-purple-600" />,
    items: [
      "React",
      "Typescript",
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
    icon: <Database className="w-6 h-6 text-purple-600" />,
    items: ["MySQL", "Postgres", "Firebase"],
  },
  {
    title: "Important Libraries",
    icon: <Hammer className="w-6 h-6 text-purple-600" />,
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
    title: "CI/CD Tools",
    icon: <Settings className="w-6 h-6 text-purple-600" />,
    items: ["Jenkins", "Docker", "Git", "Bitbucket", "Heroku"],
  },
  {
    title: "Other Tools & Software",
    icon: <Wrench className="w-6 h-6 text-purple-600" />,
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
    icon: <BookOpen className="w-6 h-6 text-purple-600" />,
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
      className="w-full min-h-screen flex flex-col items-center py-20 px-4"
      style={{
        background: `linear-gradient(162deg, transparent 20%, #facc15 20%, #facc15 60%, #ffffff 60%)`, // tailwind yellow-400
      }}
    >
      <motion.h2
        className="text-4xl w-full text-right pr-60 font-bold mb-12 themed-text-purple"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} 
        viewport={{ once: true }}
      >
        <Hammer className="inline-block font-bold mr-2 w-12 h-12 themed-text-purple" />
        <h2>Skills</h2>
      </motion.h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 z-90 gap-6 max-w-6xl w-full">
  {skills.map((category, index) => (
    <motion.div
      key={category.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6 break-inside-avoid bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        {category.icon}
        <h3 className="text-xl font-semibold text-gray-800">
          {category.title}
        </h3>
      </div>
      <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
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
