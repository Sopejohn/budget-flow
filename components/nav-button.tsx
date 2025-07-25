import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
    href: string;
    label: string;
    isActive?: boolean;
}

export const NavButton = ({href, label, isActive}: Props) => {
    return (
        <Button
            asChild
            size="sm"
            variant="outline"
            className={cn(
                "w-auto justify-between font-normal hover:bg-white/20hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                isActive ? "bg-white/10 text-white" : "bg-transparent",
            )}
        
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    );
};