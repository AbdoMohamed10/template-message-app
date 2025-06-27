import type {FC, ReactNode} from "react";
import {type CategoryType} from "../../types/FormTypes";

interface OptionProps {
    title: string
    value: CategoryType
    description: string
    icon: ReactNode
    isSelected: boolean
    handleClick: (category: CategoryType) => void
    bgColorClass?: string
}

const CategoryOption: FC<OptionProps> = ({title, value, description, icon, isSelected, handleClick, bgColorClass = 'bg-[#E4E5EF]'}) => {
    return (
        <div
            className={`flex items-center flex-wrap gap-3 p-5 rounded-lg cursor-pointer ${bgColorClass} ${isSelected ? 'border-1 border-gray-600' : ''}`}
            onClick={() => handleClick(value)}
        >
            <div className="w-12.5 aspect-square rounded-full p-[15px] bg-white flex items-center">
                {icon}
            </div>
            <div className="flex flex-col justify-between">
                <h3>{title}</h3>
                <p className="text-xs text-[#4A4A4A]">{description}</p>
            </div>
        </div>
    )
}

export default CategoryOption
