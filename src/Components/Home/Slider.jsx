'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(SplitText);

const defaultSections = [
    {
        img: "/Images/slide_1.jpg",
        headingText: "Trusted Pump Manufacturing Since 1987",
        description: "Over three decades of engineering excellence delivering reliable pumping solutions across industries.",
    },
    {
        img: "/Images/slide_2.jpg",
        headingText: "High-Performance Pumps Engineered for Every Drop",
        description: "Advanced pump technology designed for efficiency, durability, and superior water management.",
    },
    {
        img: "/Images/slide_3.png",
        headingText: "1800+ Pump Models for Domestic, Agriculture & Industrial Use",
        description: "Comprehensive range including Borewell, Openwell, Submersible, and Self-Priming Pumps.",
    }

];

const Slider = ({ sections = defaultSections, className = "" }) => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const currentIndexRef = useRef(-1);
    const animatingRef = useRef(false);
    const autoplayRef = useRef(null);

    const sectionsRefs = useRef([]);
    const imagesRefs = useRef([]);
    const outerRefs = useRef([]);
    const innerRefs = useRef([]);

    const taglineRefs = useRef([]);
    const headingRefs = useRef([]);
    const descriptionRefs = useRef([]);

    const splitTaglines = useRef([]);
    const splitHeadings = useRef([]);
    const splitDescriptions = useRef([]);

    const counterCurrentRef = useRef(null);
    const counterNextRef = useRef(null);
    const counterCurrentSplitRef = useRef(null);
    const counterNextSplitRef = useRef(null);

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Autoplay settings
    const AUTO_PLAY = true;           // ← turned on
    const AUTO_PLAY_INTERVAL = 5000;  // ms (5 seconds)

    /* -------------------------------- Images preload -------------------------------- */
    useEffect(() => {
        let loaded = 0;
        sections.forEach((s) => {
            const img = new Image();
            img.src = s.img;
            img.onload = img.onerror = () => {
                loaded++;
                if (loaded === sections.length) setImagesLoaded(true);
            };
        });
    }, [sections]);

    /* -------------------------------- Slide logic -------------------------------- */
    const gotoSection = useCallback((index, direction) => {
        if (!containerRef.current || animatingRef.current) return;

        const wrap = gsap.utils.wrap(0, sections.length);
        index = wrap(index);

        animatingRef.current = true;
        const dFactor = direction === -1 ? -1 : 1;

        const tl = gsap.timeline({
            defaults: { duration: 1.25, ease: 'power1.inOut' },
            onComplete: () => (animatingRef.current = false)
        });

        timelineRef.current = tl;

        if (currentIndexRef.current >= 0) {
            gsap.set(sectionsRefs.current[currentIndexRef.current], { zIndex: 0 });
            tl.to(imagesRefs.current[currentIndexRef.current], { yPercent: -15 * dFactor })
                .set(sectionsRefs.current[currentIndexRef.current], { autoAlpha: 0 });
        }

        gsap.set(sectionsRefs.current[index], { autoAlpha: 1, zIndex: 1 });

        tl.fromTo(
            [outerRefs.current[index], innerRefs.current[index]],
            { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
            { yPercent: 0 },
            0
        )
            .fromTo(
                imagesRefs.current[index],
                { yPercent: 15 * dFactor },
                { yPercent: 0 },
                0
            );


        // Text animations - from bottom to top per line
        const animateText = (split) => {
            if (split?.lines) {
                gsap.set(split.lines, { yPercent: 100, opacity: 0 });
                tl.to(split.lines, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, 0.4);
            }
        };

        animateText(splitTaglines.current[index]);
        animateText(splitHeadings.current[index]);
        animateText(splitDescriptions.current[index]);

        // Counter animation
        counterNextRef.current.textContent = index + 1;

        counterCurrentSplitRef.current = new SplitText(counterCurrentRef.current, {
            type: 'lines',
            linesClass: 'line'
        });

        counterNextSplitRef.current = new SplitText(counterNextRef.current, {
            type: 'lines',
            linesClass: 'line'
        });

        gsap.set(counterNextSplitRef.current.lines, {
            yPercent: 100 * dFactor
        });

        tl.to(counterCurrentSplitRef.current.lines, {
            yPercent: -100 * dFactor,
            duration: 0.6
        }, 0.4);

        tl.to(counterNextSplitRef.current.lines, {
            yPercent: 0,
            duration: 0.6
        }, 0.4).add(() => {
            counterCurrentRef.current.textContent = index + 1;
            counterCurrentSplitRef.current.revert();
            counterNextSplitRef.current.revert();
        });

        currentIndexRef.current = index;
        setCurrentIndex(index);
    }, [sections.length]);

    /* -------------------------------- Autoplay -------------------------------- */
    useEffect(() => {
        if (!AUTO_PLAY || !imagesLoaded) return;

        const startAutoplay = () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);

            autoplayRef.current = setInterval(() => {
                gotoSection(currentIndexRef.current + 1, 1);
            }, AUTO_PLAY_INTERVAL);
        };

        startAutoplay();

        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
                autoplayRef.current = null;
            }
        };
    }, [imagesLoaded, gotoSection]);

    /* -------------------------------- Init -------------------------------- */
    useGSAP(() => {
        if (!containerRef.current || !imagesLoaded) return;

        splitTaglines.current = taglineRefs.current.map(
            (el) => el ? new SplitText(el, { type: 'lines', linesClass: 'line overflow-hidden' }) : null
        );
        splitHeadings.current = headingRefs.current.map(
            (el) => el ? new SplitText(el, { type: 'lines', linesClass: 'line overflow-hidden' }) : null
        );
        splitDescriptions.current = descriptionRefs.current.map(
            (el) => el ? new SplitText(el, { type: 'lines', linesClass: 'line overflow-hidden' }) : null
        );

        splitTaglines.current.forEach(s => s?.lines.forEach(line => line.innerHTML = `<div>${line.innerHTML}</div>`));
        splitHeadings.current.forEach(s => s?.lines.forEach(line => line.innerHTML = `<div>${line.innerHTML}</div>`));
        splitDescriptions.current.forEach(s => s?.lines.forEach(line => line.innerHTML = `<div>${line.innerHTML}</div>`));

        gsap.set(outerRefs.current, { yPercent: 100 });
        gsap.set(innerRefs.current, { yPercent: -100 });


        gotoSection(0, 1);

        return () => {
            timelineRef.current?.kill();
            splitTaglines.current.forEach(s => s?.revert());
            splitHeadings.current.forEach(s => s?.revert());
            splitDescriptions.current.forEach(s => s?.revert());
        };
    }, { scope: containerRef, dependencies: [imagesLoaded] });

    /* -------------------------------- UI -------------------------------- */
    return (
        <div ref={containerRef} className={`relative h-[60vh] xs:h-[65vh] sm:h-[75vh] md:h-[85vh] lg:h-screen w-full overflow-hidden bg-black text-white ${className}`}>
            {/* Slides */}
            {sections.map((s, i) => (
                <section
                    key={i}
                    ref={(el) => (sectionsRefs.current[i] = el)}
                    className="absolute inset-0 invisible"
                >
                    <div ref={(el) => (outerRefs.current[i] = el)} className="w-full h-full overflow-hidden">
                        <div ref={(el) => (innerRefs.current[i] = el)} className="w-full h-full overflow-hidden">
                            <div
                                ref={(el) => (imagesRefs.current[i] = el)}
                                className="absolute inset-0 bg-cover bg-center flex items-end lg:items-center justify-start"
                                style={{
                                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${s.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            >
                                <div className="ms-[4%] sm:ms-[5%] max-w-[92%] sm:max-w-3xl pb-12 xs:pb-14 sm:pb-16 lg:pb-0 px-2 sm:px-0">
                                    <h2
                                        ref={(el) => (taglineRefs.current[i] = el)}
                                        className="
                      text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px]
                      text-left uppercase tracking-wider
                    "
                                    >
                                        {s.tagline}
                                    </h2>

                                    <h1
                                        ref={(el) => (headingRefs.current[i] = el)}
                                        className="
                      text-[20px] xs:text-[26px] sm:text-[34px] md:text-[42px] lg:text-[52px] xl:text-[60px]
                      font-primary heading-text font-bold
                      text-left leading-tight
                      mt-2 xs:mt-3 sm:mt-4
                    "
                                    >
                                        {s.headingText}
                                    </h1>

                                    <p
                                        ref={(el) => (descriptionRefs.current[i] = el)}
                                        className="
                      text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]
                      text-left leading-relaxed hidden sm:block
                      mt-2 xs:mt-3 sm:mt-4
                      max-w-full sm:max-w-xl md:max-w-3xl
                    "
                                    >
                                        {s.description}
                                    </p>

                                    <button
                                        className="
                      group relative inline-flex items-center justify-center
                      mt-4 xs:mt-5 sm:mt-6 md:mt-7
                      overflow-hidden select-none cursor-pointer
                      border border-zinc-900
                      bg-primary rounded-md
                      transition-shadow duration-200
                      hover:shadow-lg
                    "
                                    >
                                        <span
                                            className="
                        relative z-30 flex items-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4
                        text-white font-medium
                        text-xs xs:text-sm sm:text-base md:text-lg
                        transition-colors duration-200 ease-linear
                        group-hover:text-black
                        px-3 xs:px-4 sm:px-5 md:px-6
                        py-2 xs:py-2.5 sm:py-3 md:py-3.5 lg:py-4
                        leading-none
                      "
                                        >
                                            View Services
                                            <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                                        </span>

                                        <span
                                            className="
                        absolute inset-0 z-20
                        bg-white
                        translate-x-full
                        transition-transform duration-300 ease-out
                        group-hover:translate-x-0
                      "
                                        />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Controls + Counter */}
            <div className="absolute bottom-3 xs:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 xs:gap-3 sm:gap-4">
                <div className="z-40 flex gap-2 xs:gap-2.5 sm:gap-3 rounded-full px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-2 sm:py-2 shadow-lg">
                    <button
                        onClick={() => gotoSection(currentIndex - 1, -1)}
                        className="group relative px-2 xs:px-2.5 sm:px-3 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-bold text-white 
                     rounded-full border-2 border-white/40
                     bg-gradient-to-r from-primary to-primary
                     hover:from-primary hover:to-primary
                     hover:border-white/60
                     transition-all duration-300 ease-out 
                     active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                     overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                            <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 
                          transition-all duration-300"></div>
                    </button>

                    <button
                        onClick={() => gotoSection(currentIndex + 1, 1)}
                        className="group relative px-2 xs:px-2.5 sm:px-3 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-bold text-white 
                     rounded-full border-2 border-white/40
                     bg-gradient-to-r from-primary to-primary
                     hover:from-primary hover:to-primary
                     hover:border-white/60
                     transition-all duration-300 ease-out 
                     active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                     overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                            <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 
                          transition-all duration-300"></div>
                    </button>
                </div>

                <div className="text-xs flex gap-1 overflow-hidden hidden">
                    <span ref={counterCurrentRef}>1</span>
                    <span>/ {sections.length}</span>
                    <span ref={counterNextRef} className="absolute opacity-0" />
                </div>
            </div>
        </div>
    );
};

export default Slider;