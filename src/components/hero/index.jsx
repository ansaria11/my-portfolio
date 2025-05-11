import s from "./hero.module.scss"
import cn from "clsx"
import hero from "../../assets/vibrant-hero.jpg"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/all"
import TextCarousel from "../textCarousel"

export default function Hero() {
    const nameRef = useRef();
    const titleRef = useRef();

    gsap.registerPlugin(SplitText)

    useEffect(() => {

    }, [])


    return (
        <>
        <div
        style={{ backgroundImage: `url(${hero})` }}
        className={cn(s.hero)}
        >
            <div className={cn(s.textContainer)}>
                <div ref={nameRef} className={cn(s.nameText)}>
                    Adam Ansari
                </div>
                <div ref={titleRef} className={cn(s.mainText)}>
                    <TextCarousel textOptions={["Software Engineer", "Graphic Designer", "Web Developer"]} />
                </div>
            </div>
        </div>
        </> 
    )
}