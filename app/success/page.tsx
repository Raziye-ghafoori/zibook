"use client"

export const metadata = {
  robots: "noindex, nofollow",
};

const SERVICES = [
    { id: "cut", name: "کوتاهی" },
    { id: "color", name: "رنگ مو" },
    { id: "nail", name: "ناخن" },
    { id: "facial", name: "فیشیال" },
];


import { useEffect, useState } from "react";
export default function Success(){
      const [data, setData] = useState<{service:string, date:string, time:string, name:string, phone:string}>();

  useEffect(() => {
    const d = localStorage.getItem("demo_reservation");
    if (d) setData(JSON.parse(d));
  }, []);

    return(
         <div className="min-h-full w-full  flex items-center justify-center my-10 p-6">
      <div className="bg-pink-50 p-8 rounded-lg shadow-lg  max-w-md w-full text-center">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-semibold mb-2">نوبت شما ثبت شد</h2>
        {data ? (
          <div className="text-sm text-gray-700 mt-3 text-right">
            <div><strong>خدمت:</strong>  <span className="text-[15px] mr-2 text-gray-600 ">{SERVICES.find(s => s.id === data.service)?.name ?? "-"}</span></div>
            <div><strong>تاریخ:</strong> <span className="text-[15px] mr-2 text-gray-600">{data.date}</span></div>
            <div><strong>ساعت:</strong> <span className="text-[15px] mr-2 text-gray-600">{data.time}</span></div>
            <div><strong>نام:</strong> <span className="text-[15px] mr-2 text-gray-600 ">{data.name}</span></div>
            <div><strong>موبایل:</strong> <span className="text-[15px] mr-2 text-gray-600">{data.phone}</span></div>
          </div>
        ) : (
          <p className="text-gray-500">اطلاعاتی موجود نیست.</p>
        )}
      </div>
    </div>
    )
}