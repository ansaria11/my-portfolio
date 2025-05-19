import { useState } from "react";
import s from "./pressable.module.scss"
import cn from "clsx"

export default function Pressable({ children, className, hoverName }) {

    const [hovered, setHovered] = useState(false)

    const handleEnter = () => {
      document.documentElement.style.setProperty("--cursor-size", "50px");
      document.documentElement.style.setProperty("--cursor-blur", "0px");
      setHovered(true)
    };
  
    const handleLeave = () => {
      document.documentElement.style.setProperty("--cursor-size", "30px");
      document.documentElement.style.setProperty("--cursor-blur", "7px");
      setHovered(false)
    };
  
    return (
      <div className={cn(hovered && hoverName, className)} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {children}
      </div>
    );
  }