import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Settings,
  Factory,
  Wrench,
  Globe,
  BadgeCheck
} from 'lucide-react';

/* ------------------ Data ------------------ */

const features = [
  {
    id: 1,
    title: 'Decades of Engineering Expertise',
    desc: 'Over 30+ years of experience delivering reliable and high-performance pumping solutions across industries.',
    icon: Factory,
  },
  {
    id: 2,
    title: 'Precision Manufacturing',
    desc: 'Advanced manufacturing facilities with strict quality control at every stage of production.',
    icon: Settings,
  },
  {
    id: 3,
    title: 'Proven Reliability',
    desc: 'Our pumps are tested under extreme conditions to ensure long life and consistent performance.',
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: 'Wide Product Range',
    desc: 'From domestic to heavy industrial applications, we offer solutions for every pumping requirement.',
    icon: Globe,
  },
  {
    id: 5,
    title: 'After-Sales Support',
    desc: 'Strong service network and technical support to ensure hassle-free operation and maintenance.',
    icon: Wrench,
  },
  {
    id: 6,
    title: 'Trusted by Thousands',
    desc: 'Recognized and trusted by customers across India for quality, durability, and service excellence.',
    icon: BadgeCheck,
  },
];

/* ------------------ Motion Variants ------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/* ------------------ Component ------------------ */

const WhyChooseUs = () => {
  return (
    <section className="py-24">
      <div className="w-[95%] xl:w-[90%] mx-auto px-4">

        {/* ---------- Header ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block mb-4 rounded-full border border-primary px-5 py-1 text-xs font-semibold tracking-widest text-black bg-white"
          >
            WHY CHOOSE US
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          >
            What Makes <span className="text-primary">Angel Pumps</span> Different
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg"
          >
            We combine engineering excellence, innovation, and customer-focused
            solutions to deliver pumping systems you can trust.
          </motion.p>
        </motion.div>

        {/* ---------- Features Grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-primary">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
