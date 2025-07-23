import Link from "next/link";
import GradientText from "./ui-components/GradientText";

export function Navbar(){
    return(
        <div className="flex space-x-2 py-4 md:p-6 justify-end w-full md:text-xl">
            <Link href={'/'}><p className="hover:underline">projects</p></Link>
            <Link href={'/'}><p className="hover:underline">blog</p></Link>
            <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={true}
                className="custom-class"
            >
                <Link href={'/Aniket_Dhakane.pdf'}>resume</Link>
            </GradientText>
        </div>
    )
}