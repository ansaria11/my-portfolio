import gsap from "gsap"
import s from "./imgCarousel.module.scss"
import cn from "clsx"
import { useEffect, useRef, useState } from "react"
import Pressable from "../pressable"
import left from "../../assets/icons/left-arrow.png"
import right from "../../assets/icons/right-arrow.png"

export default function ImageCarousel({Imgs, Width, Height}) {

    const itemsRef = useRef([])
    const [moveable, setMoveable] = useState(true)
    const index = useRef(0)
    const imgWidth = 105;

    useEffect(() => {
        const items = itemsRef.current
        if (!items.length) return

        gsap.set(items, {x: `-${imgWidth}%`})
    }, [])


    const moveLeft = (e) => {
        if (moveable) {
            const items = itemsRef.current
            if (!items.length) return

            index.current -= 1

            var trueIndex = index.current;
            if (index < -1 || index > Imgs.length) {
                trueIndex = index.current % Imgs.length
                console.log("set to ", trueIndex)
            }
            
            console.log(trueIndex)

            gsap.to(items, {
                x: `${-imgWidth * (trueIndex + 1)}%`,
                duration: 0.5,
                ease: "power2.out",
                overwrite: false,
                onStart: () => {
                    setMoveable(false)
                },
                onComplete: () => {
                    if (trueIndex == -1) {
                        gsap.set(items, {x: `${-imgWidth * Imgs.length}%`})
                        index.current = Imgs.length - 1
                    }
                    if (trueIndex == Imgs.length) {
                        gsap.set(items, {x: `${-imgWidth}%`})
                        index.current = 0
                    }
                    setMoveable(true)
                }
            })
        }
    }

    const moveRight = (e) => {
        if (moveable) {
            const items = itemsRef.current
            if (!items.length) return

            index.current += 1

            var trueIndex = index.current;
            if (index < -1 || index > Imgs.length) {
                trueIndex = index.current % Imgs.length
                console.log("set to ", trueIndex)
            }
            
            console.log(trueIndex)

            gsap.to(items, {
                x: `${-imgWidth * (trueIndex + 1)}%`,
                duration: 0.5,
                ease: "power2.out",
                overwrite: false,
                onStart: () => {
                    setMoveable(false)
                },
                onComplete: () => {
                    if (trueIndex == -1) {
                        gsap.set(items, {x: `${-imgWidth * Imgs.length}%`})
                        index.current = Imgs.length - 1
                    }
                    if (trueIndex == Imgs.length) {
                        gsap.set(items, {x: `${-imgWidth}%`})
                        index.current = 0
                    }
                    setMoveable(true)
                }
            })
        }
    }

    return (
        <div style={{width: Width, height: Height}} className={cn(s.container)}>
            <Pressable className={cn(s.iconContainer, s.left)}>
                <img src={left} onClick={moveLeft} className={cn(s.icon, !moveable && s.disabled)}/>
            </Pressable>
            <Pressable className={cn(s.iconContainer, s.right)}>
                <img src={right} onClick={moveRight} className={cn(s.icon, !moveable && s.disabled)}/>
            </Pressable>
            <div className={cn(s.imageTrack)}>
                <img ref={el => itemsRef.current[0] = el} style={{width: Width, height: Height}} src={Imgs[Imgs.length - 1]} className={cn(s.image)}/>
                {Imgs.map((img, i) => (
                    <img ref={el => itemsRef.current[i + 1] = el} style={{width: Width, height: Height}} key={Imgs.length + i} src={img} className={cn(s.image)}/>
                ))}
                <img ref={el => itemsRef.current[Imgs.length + 1] = el} style={{width: Width, height: Height}} src={Imgs[0]} className={cn(s.image)}/>
            </div>
        </div>
    )
}