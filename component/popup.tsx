"use client"
import { useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";

export const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <button
                className="rounded-[10px] bg-[var(--softGray)] inset-shadow-sm border-2 border-rose-500 font-bold  w-10 h-10 text-rose-500 flex items-center justify-center hover:bg-pink-100 " ><HiOutlineFilter /></button>
            {isOpen &&
                (<div className="fixed left-4 text-center shadow-lg text-gray-600 bg-pink-200 rounded-[10px] p-5 w-50" >
                    <div >
                        <button className="hover:text-rose-500 w-full cursor-pointer" >همه</button>
                        <hr className="text-gray-500 my-2" />
                        <button className="hover:text-rose-500 w-full cursor-pointer" >در انتظار</button>
                        <hr className="text-gray-500 my-2" />
                        <button className="hover:text-rose-500 w-full cursor-pointer" >تایید شده</button>
                    </div>
                </div>)}
        </div>
    );
}



