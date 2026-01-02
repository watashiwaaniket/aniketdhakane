'use client';

import Link from "next/link";
import GradientText from "./ui-components/GradientText";

export function Navbar(){
    return(
        <div className="flex space-x-2 py-4 md:p-6 justify-end w-full md:text-xl">
            <Link href={'/wall'}><p className="hover:underline">wall</p></Link>
            <Link href={'https://dev.to/hisukurifu'}><p className="hover:underline">blog</p></Link>
            <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={true}
                className="custom-class"
            >
                <Link href={'/aniket-dhakane-latest.pdf'}>resume</Link>
            </GradientText>
        </div>
    )
}