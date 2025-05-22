import './App.css'
import cn from "clsx"
import Hero from './components/hero'
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import Projects from './components/projects'
import Navigator from './components/navigator'
import Socials from './components/socials'
import GradTest from './components/gradTest'
import About from './components/about'

import s1 from './assets/projects/Sculpta_1.png'
import e1 from './assets/projects/EventManager (1).png'
import test from './assets/hero.jpg'
import radians from "./assets/projects/Radians.png"

function App() {

    gsap.registerPlugin(ScrollSmoother)
    gsap.registerPlugin(ScrollTrigger)

    const cursorRef = useRef()
    const glowRef = useRef()
    const containerRef = useRef()
    const heroRef = useRef()
    const prevScrollRef = useRef(0)
    const [position, setPosition] = useState({x: 0, y: 0})
    const [visible, setVisible] = useState(false)
    const projectCursorRef = useRef()
    const cursorTrackRef = useRef()

    const [projectIndex, setProjectIndex] = useState(0)
    const [projectCursorVisible, setProjectCursorVisible] = useState(false)
    const [projectScroll, setProjectScroll] = useState(() => () => {})

    useEffect(() => {
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
          onUpdate: () => {
            projectScroll()
          },
        })

        window.smoother = smoother
    
        return () => smoother.kill();
      }, [projectScroll]);

    useEffect(() => {
        gsap.to(cursorTrackRef.current, {
            y: `-${projectIndex * 100}%`,
            duration: 0.3,
            ease: "power2.out",
        })
    }, [projectIndex])

    useEffect(() => {
        const scale = getComputedStyle(document.documentElement).getPropertyValue('--cursor-size') || "30px"

        gsap.to(cursorRef.current, {
            x: position.x,
            y: position.y,
            width: scale,
            height: scale,
            xPercent: -50,
            yPercent: -50,
            duration: 0.3,
            ease: "power2.out",
        })

        gsap.to(projectCursorRef.current, {
            x: position.x,
            y: position.y,
            xPercent: -50,
            yPercent: -50,
            duration: 0.3,
            ease: "power2.out",
        })

        /*
        gsap.to(glowRef.current, {
            x: position.x,
            y: position.y,
            duration: 1.5,
            ease: "power2.out",
        })
        */
    }, [position])

    useEffect(() => {
        console.log(projectCursorVisible)
        if (projectCursorVisible) {
            gsap.set(projectCursorRef.current, {y: position.y, x: position.x})
            document.documentElement.style.setProperty("--cursor-opacity", "0");
        } else {
            document.documentElement.style.setProperty("--cursor-opacity", "1");
        }
    }, [projectCursorVisible])

    const handleCursor = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        setPosition({x, y})
    }

    const handleCursorEnter = (e) => {
        setVisible(true)
    }

    const handleCursorLeave = (e) => {
        setVisible(false)
    }

  return (
    <div
        onMouseMove={handleCursor}
        onMouseEnter={handleCursorEnter}
        onMouseLeave={handleCursorLeave}
    >
        <div id="smooth-wrapper">
            <div ref={containerRef} id="smooth-content" className="main">
                <section data-speed={0.7 + 0.3} ref={heroRef}>
                    <Hero/>
                </section>
                <section>
                    <About/>
                </section>
                <section>
                    <Projects
                        setCursorVisible={setProjectCursorVisible}
                        setProjectScroll={setProjectScroll}
                        cursorPosition={position}
                        setIndex={setProjectIndex}
                    />
                </section>
                <section>
                    <div className={"footer"}>
                    </div>
                </section>
            </div>
        </div>
        <Navigator/>
        <Socials/>
        <div style={{display: !visible && "none"}} ref={cursorRef} className="blur"/>
        <div ref={projectCursorRef} className={cn("boxCursor", !projectCursorVisible && "hidden")}>
            <div ref={cursorTrackRef} className={"cursorImageTrack"}>
                <img src={s1} className={"cursorImage"}/>
                <img src={e1} className={"cursorImage"}/>
                <img src={radians} className={"cursorImage radians"}/>
            </div>
        </div>
    </div>
    
    
  )
}

export default App
