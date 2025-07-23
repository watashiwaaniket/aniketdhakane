import Link from "next/link";
import { GithubIcon } from "./icons/GithubIcon";
import { XIcon } from "./icons/XIcon";

export function Socials(){
    return(
        <div className="my-4">
            <h1 className="text-lg font-bold">
                Socials
            </h1>
            <div className="flex py-1 space-x-3">
                <Link href={'/'}><XIcon /></Link>
                <Link href={'/'}><GithubIcon /></Link>
            </div>
        </div>
    )
}