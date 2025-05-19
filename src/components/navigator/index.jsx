import Pressable from "../pressable"
import s from "./navigator.module.scss"
import cn from "clsx"

export default function Navigator() {

    return (
        <div className={cn(s.navContainer)}>
            <Pressable className={s.text} hoverName={s.hover}>
                About
            </Pressable>
            <Pressable className={s.text} hoverName={s.hover}>
                Projects
            </Pressable>
            <Pressable className={s.text} hoverName={s.hover} >
                Contact
            </Pressable>
        </div>
    )
}