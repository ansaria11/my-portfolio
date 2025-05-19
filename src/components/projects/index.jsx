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