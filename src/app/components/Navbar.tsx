import Link from "next/link";

export function Navbar(){
    return(
        <div className="flex space-x-2 p-6 justify-end w-full md:text-xl">
            <Link href={'/'}><p className="hover:underline">projects</p></Link>
            <Link href={'/'}><p className="hover:underline">blog</p></Link>
        </div>
    )
}