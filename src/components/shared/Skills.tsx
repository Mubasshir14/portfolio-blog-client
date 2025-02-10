"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import html from "@/assets/html.png";
import css from "@/assets/css.png";
import javascript from "@/assets/javascript.png";
import typescript from "@/assets/typescript.jpg";
import tailwind from "@/assets/tailwind.png";
import react from "@/assets/react.png";
import node from "@/assets/node.png";
import expressjs from "@/assets/expressjs.png";
import mongodb from "@/assets/mongodb.png";
import firebase from "@/assets/touchicon-180.png";
import next from "@/assets/n.png";
import redux from "@/assets/redux1.png";

const skillsData = [
  { name: "HTML", image: html },
  { name: "CSS", image: css },
  { name: "JavaScript", image: javascript },
  { name: "Typescript", image: typescript },
  { name: "Tailwind", image: tailwind },
  { name: "React", image: react },
  { name: "Next.js", image: next },
  { name: "Redux", image: redux },
  { name: "Node.js", image: node },
  { name: "Express.js", image: expressjs },
  { name: "MongoDB", image: mongodb },
  { name: "Firebase", image: firebase },
];

const Skills = () => {
  return (
    <section id="skill" className="">
      <div className="text-center mb-12">
        <h2 className="lg:text-4xl md:text-2xl text-primary font-extrabold bg-clip-text bg-gradient-to-b from-primary/10 to-transparent tracking-tight">
          My Tech Skills
        </h2>
        <p className="text-secondary font-semibold mt-2">
          Technologies I have experience with
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mx-auto p-2 max-w-screen-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {skillsData.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="p-8 bg-opacity-90 ring ring-primary/50 ring-offset-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl hover:bg-gradient-to-b from-primary/10 to-transparent group"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="origin-center"
            >
              <Image
                src={skill.image}
                alt={skill.name}
                width={90}
                height={90}
                className="mb-6 mx-auto rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:rotate-6"
              />
            </motion.div>
            <h3 className="text-xl font-semibold text-center text-primary">
              {skill.name}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;