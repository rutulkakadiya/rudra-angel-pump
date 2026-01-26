import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useSpring,
  useMotionValue
} from 'framer-motion';
import { Factory, Package, Smile } from 'lucide-react';

const stats = [
  {
    id: 1,
    value: 32,
    suffix: '+',
    label: 'Years of Industrial Experience',
    icon: Factory,
  },
  {
    id: 2,
    value: 1800,
    suffix: '+',
    label: 'World Class Pump Models',
    icon: Package,
  },
  {
    id: 3,
    value: 100,
    suffix: '%',
    label: 'Happy Customers',
    icon: Smile,
  },
];

const CounterItem = ({ value, suffix, label, icon: Icon, isActive }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 35,
    stiffness: 120,
  });

  const [displayValue, setDisplayValue] = useState(0);

  // Animate counter
  useEffect(() => {
    if (isActive) {
      motionValue.set(value);
    } else {
      motionValue.set(0); // reset when out of view
    }
  }, [isActive, value, motionValue]);

  // Listen spring updates
  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl bg-white border border-gray-200 p-10 text-center shadow-sm hover:shadow-xl transition-all"
    >
      {/* Icon */}
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-primary">
        <Icon size={28} />
      </div>

      {/* Counter */}
      <h3 className="text-5xl md:text-6xl font-bold text-black">
        {displayValue}
        <span className="text-primary">{suffix}</span>
      </h3>

      {/* Divider */}
      <div className="mx-auto my-4 h-1 w-12 rounded-full bg-primary" />

      {/* Label */}
      <p className="text-gray-600 text-lg font-medium leading-snug">
        {label}
      </p>
    </motion.div>
  );
};

const CounterSection = () => {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: false,      // 🔥 repeat every time
    amount: 0.4,      // 40% visible
  });

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Header */}
      <div className="w-[90%] mx-auto mb-16 text-center max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          className="inline-block mb-4 rounded-full border border-primary px-5 py-1 text-xs font-semibold tracking-widest text-black"
        >
          OUR STRENGTH
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
        >
          Engineering Excellence <br /> Backed by Numbers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          className="text-gray-600 text-lg"
        >
          Decades of experience, innovation, and trust that power industries
          across India and beyond.
        </motion.p>
      </div>

      {/* Counters */}
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <CounterItem
              key={stat.id}
              {...stat}
              isActive={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
