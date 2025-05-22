import s from "./projects.module.scss"
import cn from "clsx"
import bg from "../../assets/bg_test1.png"
import Project from "../project"

import test from "../../assets/hero.jpg"

import s1 from "../../assets/projects/Sculpta_1.png"
import s2 from "../../assets/projects/Sculpta_2.png"
import s3 from "../../assets/projects/Sculpta_3.png"
import s4 from "../../assets/projects/Sculpta_4.png"

import e1 from "../../assets/projects/EventManager (1).png"
import e2 from "../../assets/projects/EventManager (2).png"
import e3 from "../../assets/projects/EventManager (4).png"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Observer, ScrollTrigger } from "gsap/all"

/*
export default function Projects() {  
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className={cn(s.container)}>
            <div className={cn(s.title)}>
                Projects
            </div>
            <div className={cn(s.projects)}>
                <Project 
                    Name={"Sculpta"}
                    Description={
                        `A beginner-friendly 3D modelling software to help aspiring graphic designers hone their modelling skills. 
                        Written in C++ and built using OpenGL as an entry point into full scale software development, I effectively 
                        researched and applied the complex maths required for a 3D graphics software.`
                    }
                    Timeframe={"December 2024 - March 2025"}
                    Skills={["C++", "OpenGL"]}
                    Imgs={[s1, s2, s3, s4]}
                />
                <Project 
                    Name={"Event Manager"}
                    Description={
                        `A desktop app useful for managing a busy schedule. The Event Manager breaks down long-term goals into smaller, 
                        more achievable tasks. Built using Electron.js for its cross-platform compatability,
                        and created using HTML, CSS and JavaScript.
                        `
                    }
                    Timeframe={"April 2024 - November 2024"}
                    Skills={["Web", "Electron.js"]}
                    Imgs={[e1, e2, e3]}
                />
                <Project 
                    Name={"Radians"}
                    Description={
                        `A beginner-friendly 3D modelling software to help aspiring graphic designers hone their modelling skills. 
                        Written in C++ and built using OpenGL as an entry point into full scale software development, I effectively 
                        researched and applied the complex maths required for a 3D graphics software.`
                    }
                    Timeframe={"February 2024 - April 2024"}
                    Skills={["HTML", "CSS", "JS"]}
                    Imgs={[test]}
                />
            </div>
        </div>
    )
}
*/

export default function Projects({setProjectScroll, setCursorVisible, cursorPosition, setIndex}) {

    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(Observer)

    const containerRef = useRef()
    const projectsRef = useRef()
    const headerRef = useRef()
    const p1Ref = useRef()
    const p2Ref = useRef()
    const p3Ref = useRef()
    const cursorPositionRef = useRef()

    useEffect(() => {
        setProjectScroll(() => () => handleProjectScroll())
    }, [setProjectScroll])

    useEffect(() => {
        cursorPositionRef.current = cursorPosition
    }, [cursorPosition])

    useEffect(() => {
        const stagger = 0.1

        gsap.set(p1Ref.current, {y: 30, opacity: 0})
        gsap.set(p2Ref.current, {y: 30, opacity: 0})
        gsap.set(p3Ref.current, {y: 30, opacity: 0})
        gsap.set(headerRef.current, {x: -30, opacity: 0})

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "70% 100%",
            },
            defaults: {
                ease: "power2.out",
                duration: 0.4
            }
        })

        tl.fromTo(
            p1Ref.current,
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
            }
        )
        
        tl.fromTo(
            p2Ref.current,
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
            },
            stagger,
        )

        tl.fromTo(
            p3Ref.current,
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
            },
            stagger * 2,
        )

        gsap.fromTo(
            headerRef.current,
            {
                x: -30,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "bottom 80%"
                },
                duration: 0.5
            }
        )

    }, [])

    const handleProjectScroll = () => {
        const indexData = getProjectIndex()
        if (indexData.cursor < 0 || indexData.cursor > projectsRef.current.offsetHeight)
            setCursorVisible(false)
        setIndex(indexData.index)
    }

    const getProjectIndex = () => {
        const projectHeight = p1Ref.current.offsetHeight
        const cursorY = cursorPositionRef.current.y
        const projectTop = projectsRef.current.getBoundingClientRect().top
        const cursorOffset = cursorY - projectTop
        const index = Math.floor(cursorOffset / projectHeight)
        const clampedIndex = Math.min(Math.max(index, 0), 2)
        return {"index": clampedIndex, "cursor": cursorOffset}
    }

    const handleEnterContainer = (e) => {
        console.log("enter")
        setCursorVisible(true)
        //gsap.set(cursorRef.current, {left: offsetX, top: offsetY})
    }

    const handleLeaveContainer = (e) => {

        setCursorVisible(false)
    }

    const handleMoveContainer = (e) => {
        setCursorVisible(true)
        setIndex(getProjectIndex().index)
    }

    return (
        <div ref={containerRef} className={cn(s.container)}>
            <div ref={headerRef} className={cn(s.header)}>
                Projects
            </div>
            <div ref={projectsRef} onMouseEnter={handleEnterContainer} onMouseLeave={handleLeaveContainer} onMouseMove={handleMoveContainer} className={cn(s.projectContainer)}>
                <div ref={p1Ref} className={cn(s.project)}>
                    <div className={cn(s.title)}>
                        <div className={cn(s.number)}>
                            01
                        </div>
                        Sculpta
                    </div>
                    <div className={cn(s.desc)}>
                        3D Modelling Software
                    </div>
                </div>
                <div ref={p2Ref} className={cn(s.project)}>
                    <div className={cn(s.title)}>
                        <div className={cn(s.number)}>
                            02
                        </div>
                        Event Manager
                    </div>
                    <div className={cn(s.desc)}>
                        Multi-Purpose Calendar
                    </div>
                </div>
                <div ref={p3Ref} className={cn(s.project)}>
                    <div className={cn(s.title)}>
                        <div className={cn(s.number)}>
                            03
                        </div>
                        Radians
                    </div>
                    <div className={cn(s.desc)}>
                        Product Showcase Site
                    </div>
                </div>
            </div>
        </div>
    )
}