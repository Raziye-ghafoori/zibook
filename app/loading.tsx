
export default function Loading() {
    return (
        <div className="mt-10">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div
                    className="w-20 h-20 border-4 border-transparent text-pink-400 text-4xl animate-spin flex items-center justify-center border-t-pink-400 rounded-full"
                >
                    <div
                        className="w-16 h-16 border-4 border-transparent text-rose-600 text-2xl animate-spin flex items-center justify-center border-t-rose-600 rounded-full"
                    ></div>
                </div>
            </div>

        </div>
    )
}