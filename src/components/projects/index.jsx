import s from "./projects.module.scss"
import cn from "clsx"

export default function Projects() {
    return (
        <div data-speed="1" className={cn(s.container)}>
            <div data-speed="2" className={cn(s.test)}>

            </div>
        </div>
    )
}