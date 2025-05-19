import s from "./gradTest.module.scss"
import cn from "clsx"
import test from "../../assets/bg_test.png"

export default function GradTest() {
    return (
        <div className={cn(s.container)} style={{ backgroundImage: `url(${test})` }}>
            <div className={cn(s.gradContainer)}>
                <div className={cn(s.text)}>
                Hello hello hello
                </div>
            </div>
        </div>
    )
}