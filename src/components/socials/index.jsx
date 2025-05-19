import s from "./socials.module.scss"
import cn from "clsx"
import youtube from "../../assets/icons/youtube.svg"
import github from "../../assets/icons/github.svg"
import instagram from "../../assets/icons/instagram.svg"
import linkedin from "../../assets/icons/linkedin.svg"
import { useState } from "react"
import HoverIcon from "../hoverIcon"


export default function Socials() {

    return (
        <div className={cn(s.container)}>
            <HoverIcon href={"https://www.youtube.com"} icon={youtube}/>
            <HoverIcon href={"https://www.github.com"} icon={github}/>
            <HoverIcon href={"https://www.instagram.com"} icon={instagram}/>
            <HoverIcon href={"https://www.linkedin.com"} icon={linkedin}/>
        </div>
    )
}