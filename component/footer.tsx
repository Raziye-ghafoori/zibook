
export const Footer = () => {
    return (
        <footer className="bg-pink-200 text-gray-500 ">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* معرفی برند */}
                <div>
                    <h3 className="text-rose-500 text-lg mb-3">ZiBook</h3>
                    <p className="text-sm leading-6">
                        رزرو آنلاین وقت سالن زیبایی، سریع و بدون تماس تلفنی.
                        با چند کلیک، نوبتت رو بگیر و بدون معطلی بیای.
                    </p>
                </div>


                <div className="flex justify-around">

                    {/* لینک‌های سریع */}
                    <div className="w-[50%]">
                        <h4 className="text-rose-500  mb-3">دسترسی سریع</h4>
                        <ul className="space-y-1 text-sm">
                            <li><a href="/" className="hover:text-rose-400">خانه</a></li>
                            <li><a href="/reserve" className="hover:text-rose-400">رزرو نوبت</a></li>
                            <li><a href="#" className="hover:text-rose-400">درباره ما</a></li>
                            <li><a href="#" className="hover:text-rose-400">تماس با ما</a></li>
                        </ul>
                    </div>

                    {/* ارتباط با ما */}
                    <div className="w-[50%]">
                        <h4 className="text-rose-500  mb-3">ارتباط با ما</h4>
                        <ul className="space-y-2 text-sm">
                            <li>📞 0912xxx</li>
                            <li>📍 تهران</li>
                            <li>
                                📸
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    className="hover:text-rose-400 mr-1"
                                >
                                    @zibatime
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* کپی‌رایت */}
            <div className="border-t border-gray-400 text-center py-4 text-xs text-gray-400">
                © 2025 تمامی حقوق محفوظ است | ساخته‌شده با Zibook برای سالن‌های زیبایی
            </div>
        </footer>
    )
}