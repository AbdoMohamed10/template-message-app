import type {FC, ReactNode} from "react";

interface CardProps {
    title: string
    description: string
    children: ReactNode
}

const Card: FC<CardProps> = ({title, description, children}) => {
    return (
        <div className="flex flex-col gap-y-2.5 mb-10">
            <h2 className="text-base">{title}</h2>
            <h3 className="text-sm text-[#4A4A4A]">{description}</h3>
            <div className="bg-white p-5">{children}</div>
        </div>
    )
}

export default Card
