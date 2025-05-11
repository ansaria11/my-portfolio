import { useEffect, useLayoutEffect, useRef, useState } from "react"
import s from "./textCarousel.module.scss"
import cn from "clsx"
import gsap from "gsap";
import { SplitText } from "gsap/all";

/*
    All rows, every interval play animation shifting them all up one by one, when done reset before looping
*/



export default function TextCarousel({textOptions}) {

    gsap.registerPlugin(SplitText)

    const containerRef = useRef();
    const splitsRef = useRef([]);

    const optionIndex = useRef(0)
    const [options, setOptions] = useState(() => [
        ...textOptions,
        textOptions[0]
    ])

    useLayoutEffect(() => {

        const speed = 5

        const scopeEl = containerRef.current;
        if (!scopeEl) return;

        const ctx = gsap.context(() => {
          
            console.log("hello")

            const selectors = options.map((_, i) => scopeEl.querySelector(`#split-${i}`))
            
            const elements = gsap.utils.toArray(selectors)

            splitsRef.current = elements.map(el =>
                new SplitText(el, { type: 'chars, words, lines' })
            )

            const tl = gsap.timeline({
                repeat: -1,
            })

            tl.to({}, {duration: speed - 0.6})

            options.forEach((_, i) => {
                if (i != options.length - 1)
                splitsRef.current.forEach(split => {
                    tl.to(split.chars, {
                        yPercent: "-=50",
                        stagger: 0.05,
                        duration: 0.6,
                        ease: 'power2.out',
                    }, (i + 1) * speed)
                });
            })

            tl.call(() => {
                splitsRef.current.forEach(split => {
                  gsap.set(split.chars, { yPercent: 0 }); // reset to base
                });
            });

            return () => {
                splitsRef.current.forEach(s => s.revert());
                ctx.revert();
              };
        }, containerRef)
    }, [options])

    return (
        <div ref={containerRef} className={cn(s.container)}>
            {options.map((text, i) => (
                <div id={`split-${i}`} key={i} style={{top: `${1.5 * i}em`}} className={cn(i == 0 && s.first, i != 0 && s.text)}>
                    {text}
                </div>
            ))}
        </div>
    )
}