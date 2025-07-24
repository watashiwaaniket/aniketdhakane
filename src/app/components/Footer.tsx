import ShinyText from "./ui-components/ShinyText";

export default function Footer(){
    return(
        <div className="text-center">
            <hr className="text-gray-500"/>
            <div className="p-4 pb-8 text-sm">
                <ShinyText text={`© 2025 Aniket Dhakane`} disabled={false} speed={3} className="custom-class" />
            </div>
        </div>
    )
}