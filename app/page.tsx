import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="w-full h-full bg-pink-100">
      <section className="h-screen text-center text-white top-0 flex items-center justify-center bg-[url('@/public/images/image11.webp')] bg-cover bg-center">
        <div className="h-full w-full backdrop-brightness-50 backdrop-blur-sm hover:backdrop-blur-none  flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="md:text-7xl text-4xl text-shadow-lg font-bold mb-8">رزرو آنلاین وقت آرایشگاه</h1>
            <p className="md:text-lg text-xl  mb-8 text-pink-200 mx-2">زیبایی شما در دستان ماست، همین حالا وقت خود را رزرو کنید.</p>
            <Link href={'/reserve'} className="bg-white text-pink-600 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition">
              رزرو کنید
            </Link>
          </div>

        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-8 px-6 py-16 max-w-6xl mx-auto">
        <Link href={'/service/haircut'} className="hover:bg-pink-200 hover:shadow-xl bg-white p-6 rounded-lg shadow text-center flex md:flex-col items-center justify-around">
          <Image src={'/images/haircut/image2.jpg'} alt="haircut" className="w-40 h-40 rounded-[20px] shadow-xl mb-2" width={500} height={500} />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">کوتاهی مو</h2>
            <p className="text-gray-600 mb-2">استایل جدید با بهترین آرایشگران.</p>
          </div>
        </Link>
        <Link href={'/service/color'} className="hover:bg-pink-200 bg-white p-6 rounded-lg shadow text-center flex md:flex-col flex-row-reverse items-center justify-around">
          <Image src={'/images/color/image2.webp'} alt="color" className="w-40 h-40 rounded-[20px] shadow-xl mb-2" width={500} height={500} />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">رنگ مو</h2>
            <p className="text-gray-600">جدیدترین رنگ‌ها و تکنیک‌ها.</p>
          </div>
        </Link>
        <Link href={'/service/makeup'} className="hover:bg-pink-200 bg-white p-6 rounded-lg shadow text-center flex md:flex-col  items-center justify-around">
          <Image src={'/images/makeup/image2.webp'} alt="makeup" className="w-40 h-40 rounded-[20px] shadow-xl mb-2" width={500} height={500} />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">میکاپ</h2>
            <p className="text-gray-600">میکاپ حرفه‌ای برای مراسم‌ها.</p>
          </div>
        </Link>
        <Link href={'/service/implant'} className="hover:bg-pink-200 bg-white p-6 rounded-lg shadow text-center flex md:flex-col flex-row-reverse items-center justify-around">
          <Image src={'/images/implant/image2.jpeg'} alt="implant" className="w-40 h-40 rounded-[20px] shadow-xl mb-2" width={500} height={500} />
          <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-2">کاشت</h2>
          <p className="text-gray-600">کاشت ناخن پا و دست با بهترین مواد روز</p>
        </div>
        </Link>
      </section>

      <section>
        <div className="mx-5 font-bold text-[25px]">
          <h1>تخفیف های ویژه🔥🔥</h1>
        </div>
        <div className="overflow-scroll overflow-x-auto overflow-y-hidden flex py-5 mx-5">
          <div className="min-w-50 h-full  bg-white p-2 mx-2 flex flex-col items-center justify-center">
            <Image src="/images/implant/image1.jpg" alt="تخفیف کاشنت ناخن" className="rounded-lg " width={200} height={200} />
            <h1>کاشت ناخن</h1>
            <div className="flex justify-around w-full blur-xs hover:blur-none">
              <span className="font-bold text-[20px]">20000</span>
              <span className="line-through text-gray-500 ">25000</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

