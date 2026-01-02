import Link from "next/link";
import Image from "next/image";

export default function Footer(){
    return(
        <div className="text-center">
            <h1 className="text-lg font-bold py-4">All time Fav Songs</h1>
            <div className="w-full flex justify-center pb-8 gap-8">
            <Link href={'https://open.spotify.com/track/7mykoq6R3BArsSpNDjFQTm?si=d604b24bb4f84564'}>
                <Image src='/cp.png' alt="" height={240} width={240} className="rounded-xl" />
            </Link>
            <Link href={'https://music.apple.com/in/album/after-hours/1505683705?i=1505683998'}>
                <Image src='/ah.jpg' alt="" height={240} width={240} className="rounded-xl"/>
            </Link>
            </div>
        </div>
    )
}