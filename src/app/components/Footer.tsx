import Link from "next/link";
import ShinyText from "./ui-components/ShinyText";

export default function Footer(){
    return(
        <div className="text-center">
            <h1 className="text-lg font-bold py-4">All time Fav Songs</h1>
            <div className="w-full flex justify-center pb-8">
            <Link href={'https://open.spotify.com/track/7mykoq6R3BArsSpNDjFQTm?si=d604b24bb4f84564'}>
                <img src="/cp.png" alt="" className="w-60 rounded-xl" />
            </Link>
            </div>
            <hr className="text-gray-500"/>
            <div className="p-4 pb-8 text-sm">
                <ShinyText text={`© 2025 Aniket Dhakane`} disabled={false} speed={3} className="custom-class" />
            </div>
        </div>
    )
}