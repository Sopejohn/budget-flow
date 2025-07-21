import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="flex items-center">
                <Image src="/logo.svg" alt="Logo" height={28} width={28} />
                <p className="font-semibold text-white text-2xl ml-2.5">
                    Budget Flow
                </p>
            </div>
        </Link>
    )
}