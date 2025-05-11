import Pressable from "../pressable"
import s from "./navigator.module.scss"
import cn from "clsx"

export default function Navigator() {

    return (
        <div className={cn(s.navContainer)}>
            <Pressable>
                About
            </Pressable>
            <Pressable>
                Projects
            </Pressable>
            <Pressable>
                Contact
            </Pressable>
        </div>
    )
}