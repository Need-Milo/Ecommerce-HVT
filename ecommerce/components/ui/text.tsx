import { cn } from "@/lib/utils";

const Title = ({children,className} : {
    children: React.ReactNode;
    className?: string;
}   ) => {
    return (
        <>
        {/* text-2xl md:text-3xl */}
            <h2 className={cn(" font-bold text-shop_dark_green capitalize tracking-wide font-sans  ",className)} >{children}</h2>
        </>
    )
}

const SubTitle = ({children,className} : {
    children: React.ReactNode;
    className?: string;
}   ) => {
    return (
        <>
            <h3 className={cn("font-semibold font-sans text-gray-900 ",className)} >{children}</h3>
        </>
    )
}

const SubText = ({children,className} : {
    children: React.ReactNode;
    className?: string;
}) => {
   return <p className={cn("text-sm text-gray-600", className)} >{children}</p>

}

export {Title, SubText, SubTitle }