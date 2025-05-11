import { useState } from "react";
import s from "./pressable.module.scss"
import cn from "clsx"

export default function Pressable({ children }) {

    const [isHoverred, setIsHoverred] = useState(false)

    const handleEnter = () => {
      document.documentElement.style.setProperty("--cursor-size", "50px");
      setIsHoverred(true)
    };
  
    const handleLeave = () => {
      document.documentElement.style.setProperty("--cursor-size", "30px");
      setIsHoverred(false)
    };
  
    return (
      <div className={cn(s.container, isHoverred && s.hover)} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {children}
      </div>
    );
  }