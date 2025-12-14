import Link from "next/link"

export const Header =()=>{
    return(
         <header  className="flex justify-between p-5 w-full z-100 sticky top-0 h-15 bg-pink-200 shadow-lg text-gray-500 text-shadow-sm text-[20px] items-center ">
                <Link href={'/login'} className="text-[25px] hover:text-rose-500 hover:font-bold  ">
                ورود
                </Link>
                <Link href={"/"} className="hover:text-[#ffffff] font-bold text-rose-500 text-[30px]" >Zibook</Link>
                
            </header>
    )
}