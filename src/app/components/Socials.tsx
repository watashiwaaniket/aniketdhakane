import Link from "next/link";
import { GithubIcon } from "./icons/GithubIcon";
import { XIcon } from "./icons/XIcon";
import { LinIcon } from "./icons/LinIcon";
import { MailIcon } from "./icons/MailIcon";

export function Socials(){
    return(
        <div className="my-4">
            <h1 className="text-lg font-bold">
                Socials
            </h1>
            <div className="flex py-1 space-x-3">
                <Link href={'https://x.com/astriknormal'}><XIcon /></Link>
                <Link href={'https://github.com/watashiwaaniket'}><GithubIcon /></Link>
                <Link href={'https://www.linkedin.com/in/aniket-dhakane-9b06a125b/'}><LinIcon /></Link>
                <Link href={'mailto:aniketdhakane3@gmail.com'}><MailIcon /></Link>
            </div>
        </div>
    )
}