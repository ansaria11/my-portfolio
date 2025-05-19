import { useEffect, useRef, useState } from "react";
import s from "./hoverIcon.module.scss"
import cn from "clsx"
import gsap from "gsap";
import gsapWithCSS from "gsap/all";

export default function HoverIcon({icon, href}) {
    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({x: 0, y:0})
    const iconRef = useRef();

    useEffect(() => {
        if (!hovered) {
            gsap.to(iconRef.current, {
                left: "50%",
                top: "50%",
                duration: 0.2,
                ease: "power2.out",
            })
        }
    }, [hovered])
    
    useEffect(() => {
        if (hovered) {
            gsap.to(iconRef.current, {
                left: position.x,
                top: position.y,
                duration: 0.2,
                ease: "power2.out",
            })
        }
    }, [position])

    const handleMouseEnter = (e) => {
        document.documentElement.style.setProperty("--cursor-size", "50px");
        document.documentElement.style.setProperty("--cursor-blur", "0px");
        setHovered(true)
        console.log("enter")
    }

    const handleMouseLeave = (e) => {
        document.documentElement.style.setProperty("--cursor-size", "30px");
        document.documentElement.style.setProperty("--cursor-blur", "7px");
        setHovered(false)
        console.log("left")
    }

    const handleMouseMove = (e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        setPosition({x, y})
    }

    return (
        <a href={href} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={cn(s.container)}>
            <img ref={iconRef} className={cn(s.icon, !hovered && s.faded, hovered && s.position)} src={icon}/>
        </a>
    )
}