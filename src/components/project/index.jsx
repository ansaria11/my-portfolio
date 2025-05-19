import ImageCarousel from "../imgCarousel"
import s from "./project.module.scss"
import cn from "clsx"
import link from "../../assets/icons/up-right-arrow.png"
import Pressable from "../pressable"

export default function Project({Name, Description, Timeframe, Skills, Imgs}) {

    return (
        <div className={cn(s.projectContainer)}>
            <div className={cn(s.projectText)}> 
                <div>
                    <Pressable className={cn(s.projectTitle)} hoverName={s.titleHover}>
                        {Name}
                        <img className={cn(s.link)} src={link} />
                    </Pressable>
                </div>
                    <div className={cn(s.projectDesc)}>
                        {Description}
                    </div>
                <div className={cn(s.subText)}>
                    <div>
                        {Timeframe}
                    </div>
                    <div className={cn(s.projectSkills)}>
                        {Skills.map((skill, i) => (
                            <div key={i} className={cn(s.projectSkill)}>
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ImageCarousel Imgs={Imgs} Width={"40em"} Height={"30em"}/>
        </div>
    )
}