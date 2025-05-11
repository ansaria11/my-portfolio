import './App.css'
import Hero from './components/hero'
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import Projects from './components/projects'
import Navigator from './components/navigator'

function App() {

    gsap.registerPlugin(ScrollSmoother)
    gsap.registerPlugin(ScrollTrigger)

    const cursorRef = useRef()
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
    }, [])

    useEffect(() => {
        const scale = getComputedStyle(document.documentElement).getPropertyValue('--cursor-size') || "30px"
        const blur = scale == "30px" ? "blur(7px)" : "blur(0px)"

        gsap.to(cursorRef.current, {
            x: position.x,
            y: position.y,
            width: scale,
            height: scale,
            xPercent: -50,
            yPercent: -50,
            duration: 0.3,
            backdropFilter: blur,
            ease: "power2.out",
        })

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
            <div id="smooth-content" className="main">
                <Hero/>
                <Projects/>
            </div>
        </div>
        <Navigator/>
        <div style={{display: !visible && "none"}} ref={cursorRef} className="blur"/>
    </div>
    
    
  )
}

export default App
