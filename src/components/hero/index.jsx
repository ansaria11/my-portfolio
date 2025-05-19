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
        const splitName = new SplitText(nameRef.current, {type: "chars"})
        const tl = gsap.timeline()
        tl
        .from(splitName.chars, {
            opacity: 0,
            y: 10,
            stagger: 0.03,
            ease: "power2.out",
            duration: 0.3,
        })
      
        return () => {
            splitName.revert()
            tl.kill()
        };
    }, [])


    return (
        <>
        <div
        style={{ backgroundImage: `url(${hero})` }}
        className={cn(s.hero)}
        >
            <div className={cn(s.textContainer)}>
                <div>
                    <div ref={nameRef} className={cn(s.nameText)}>
                        Adam Ansari
                    </div>
                    <div ref={titleRef} className={cn(s.mainText)}>
                        <TextCarousel textOptions={["Software Engineer", "Graphic Designer", "Web Developer", "Game Creator"]} />
                    </div>
                </div>
                <div className={cn(s.descText)}>
                    An innovative and driven student with a range of experience, varying from face-to-face sales to digital creation.
                </div>
            </div>
        </div>
        </> 
    )
}