"use client"
export  const Search = ()=>{
    return(
        <div>
             <div className="relative w-60 group">
                        <span
                            className="absolute -right-1 top-2 bottom-2 w-2.5 rounded bg-gradient-to-b from-pink-500 to-rose-500 opacity-70 transition-all duration-300 group-focus-within:opacity-100"
                        ></span>
                        <input
                            type="text"
                            id="input"
                            placeholder=""
                            className="peer text-right w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-rose-400 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
                        />
                        <label
                            htmlFor="input"
                            className="absolute right-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-rose-500  cursor-text"
                        >
                            جستجو
                        </label>
                    </div>
        </div>
    )
}