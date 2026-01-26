import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutUsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    // Container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0
            }
        }
    };

    // Fade up animation
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // Fade in from left
    const fadeLeftVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // Fade in from right
    const fadeRightVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // Scale animation for overlay card
    const scaleVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut", delay: 0.2 }
        }
    };

    return (
        <section className="bg-white py-24">
            <motion.div
                ref={ref}
                className="w-[90%] mx-auto px-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-6 space-y-10">

                        {/* Badge */}
                        <motion.span
                            variants={fadeUpVariants}
                            className="inline-flex items-center rounded-full border border-primary px-4 py-1 text-xs font-medium"
                        >
                            ABOUT US · ANGEL PUMPS
                        </motion.span>

                        {/* Heading */}
                        <motion.h2
                            variants={fadeUpVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        >
                            Transforming Vision into Precision-Engineered Reality Since <span className="text-primary">1987</span>
                        </motion.h2>

                        {/* Image with overlay card */}
                        <motion.div
                            variants={fadeLeftVariants}
                            className="relative"
                        >
                            <img
                                src="/Images/about_us.png"
                                alt="Manufacturing Facility"
                                className="rounded-3xl w-full object-cover"
                            />

                            {/* Overlay Card */}
                            <motion.div
                                variants={scaleVariants}
                                className="absolute bottom-6 left-6 bg-white rounded-3xl p-6 shadow-xl"
                            >
                                <div className="flex items-start gap-5">

                                    {/* Number */}
                                    <span className="text-6xl font-bold text-primary leading-none">
                                        35<span className="text-3xl align-top ml-1">+</span>
                                    </span>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            Years of Engineering <br /> Experience
                                        </h4>

                                        <div className="h-1 w-12 bg-primary rounded-full" />

                                    </div>

                                </div>

                            </motion.div>

                        </motion.div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="lg:col-span-6 space-y-4">

                        {/* Tall Image */}
                        <motion.img
                            variants={fadeRightVariants}
                            src="/Images/about_us_1.png"
                            alt="Industrial Infrastructure"
                            className="rounded-3xl w-full h-full object-cover"
                        />

                        {/* Heritage Tagline */}
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-sm text-gray-500 italic"
                        >
                            Built on ethics. Driven by engineering. Trusted for decades.
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-gray-600 text-lg leading-relaxed"
                        >
                            Established in 1987 in Rajkot, Angel Pumps began its journey as a motor
                            manufacturing unit founded on strong engineering principles and ethical
                            business practices. What started as a focused effort to serve the diamond
                            and textile industries of Gujarat gradually evolved into a trusted name
                            across Saurashtra and South Gujarat.
                        </motion.p>

                        <motion.p
                            variants={fadeUpVariants}
                            className="text-gray-600 text-lg leading-relaxed"
                        >
                            With steady growth, indigenous product development, and an unwavering
                            commitment to quality, the Angel brand expanded into the pumps segment —
                            introducing centrifugal, regenerative, and bore-well submersible pumps.
                            Today, supported by advanced manufacturing infrastructure and a robust
                            distribution network, Angel Pumps delivers reliable pumping solutions
                            across agriculture, industry, infrastructure, and domestic applications.
                        </motion.p>

                    </div>

                </div>
            </motion.div>
        </section>
    );
};

export default AboutUsSection;