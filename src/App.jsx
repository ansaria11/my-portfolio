import './App.css'
import Hero from './components/hero'
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import Projects from './components/projects'
import Navigator from './components/navigator'
import Socials from './components/socials'
import GradTest from './components/gradTest'

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

    useEffect(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2,
            effects: true,
            onUpdate: handleScrollUpdate,
        })
        /*
        gsap.to(glowRef.current, {
            rotate: 360,
            repeat: -1,
            duration: 15,
            ease: "linear"
        })

        gsap.to(document.documentElement, {
            "--background-colour": "#fff",
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: "bottom bottom",
                end: "top+=100% top",
                scrub: true,
            }
        })
            */
    }, [])

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

        /*
        gsap.to(glowRef.current, {
            x: position.x,
            y: position.y,
            duration: 1.5,
            ease: "power2.out",
        })
        */
    }, [position])

    const handleScrollUpdate = () => {
    }

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
                    <Projects/>
                </section>
            </div>
        </div>
        <Navigator/>
        <Socials/>
        <div style={{display: !visible && "none"}} ref={cursorRef} className="blur"/>
        {false && <div ref={glowRef} className="glowContainer">
            <div className="glow glowRed"/>
            <div className="glow glowBlue"/>
            <div className="glow glowPink"/>
        </div>}
    </div>
    
    
  )
}

export default App
