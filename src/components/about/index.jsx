import { useRef } from "react"
import s from "./about.module.scss"
import cn from "clsx"
import { useEffect } from "react"
import { DrawSVGPlugin, ScrollTrigger, SplitText } from "gsap/all"
import gsap from "gsap"

export default function About() {

    const pathRef = useRef()
    const paraRef = useRef()
    const titleRef = useRef()
    const titleTopRef = useRef()
    const titleBotRef = useRef()
    
    gsap.registerPlugin(DrawSVGPlugin)
    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(SplitText)

    useEffect(() => {
        gsap.fromTo(
            pathRef.current,
            { drawSVG: "0%" }, // start with 0% of the path visible
            {
                drawSVG: "100%",  // draw the whole path
                scrollTrigger: {
                    trigger: pathRef.current,
                    start: "top 80%",     // when the top of the path hits 80% of viewport
                    end: "bottom 80%",    // animation ends when bottom hits 20% of viewport
                    scrub: true,          // ties animation progress to scroll
                },
                ease: "power1.inOut",
            }
        );

        const splitPara = SplitText.create(paraRef.current, { type: "lines" })
        gsap.fromTo(
            splitPara.lines,
            { opacity: 0,   y: 30 },   // “start” state (invisible + shifted left)
            {
              opacity: 1, 
              y: 0, 
              ease: "power2.out",
              scrollTrigger: {
                trigger: paraRef.current,
                start: "top 80%"
              },
              duration: 0.5,
              stagger: 0.05,
            }
        );

        const titleTl = gsap.timeline({
        scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%"
        },
        defaults: {
            ease: "power2.out"
        }
        });

        const topSplit = SplitText.create(titleTopRef.current, { type: "words" })
        const botSplit = SplitText.create(titleBotRef.current, { type: "words" })

        titleTl.fromTo(
            topSplit.words,
            { y: "100%" },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
            }
        ).to(
            topSplit.words,
            {
                x: "0.5em",
                duration: 0.5,
                stagger: -0.05,
            }
        ).fromTo(
            botSplit.words,
            { y: "-100%" },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
            },
            0.2
        )

      }, []);
    
    //  Imagined Design Delivered Code

    return (
        <div className={cn(s.wrapper)}>
            <div className={cn(s.container)}>
                <div ref={titleRef} className={cn(s.headerText)}>
                    <div className={cn(s.textMask)}>
                        <div ref={titleTopRef} className={cn(s.top)}>
                            Design Dreams
                        </div>
                    </div>
                    <div className={cn(s.textMask)}>
                        <div ref={titleBotRef} className={cn(s.bottom)}>
                            Engineer Reality
                        </div>
                    </div>
                    
                </div>
                <div data-speed={1.1} ref={paraRef} className={cn(s.mainText)}>
                    Crafting and creating for over 3 years now, I started my journey tinkering with online games. I then discovered the world of
                    graphic design, and began building my very own websites. At the same time, I learnt C++ and created a 3D modelling software, 
                    expanding on my love of both software engineering and 3D design.
                </div>
                <div className={cn(s.projects)}>

                </div>
            </div>
            <svg className={cn(s.svg)} viewBox="0 0 9 9" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#002ae7" />
                    <stop offset="100%" stopColor="#e700c1" />
                    </linearGradient>
                </defs>
                <path
                    ref={pathRef}
                    d="M 0 0 S 4.17 0.432 4.5 3 S 3.429 6.636 2.0835 4.5765 S 5.379 1.722 2.0025 10.452"
                    stroke="url(#gradientStroke)"
                    strokeLinecap="round"
                    fill="none"
                    strokeWidth={0.2}
                />
            </svg>
        </div>
        
    )
}