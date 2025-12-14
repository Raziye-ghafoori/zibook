"use client"

import Calendar from "@/component/calendar"
import React, { useState, useMemo  } from "react";
import { useRouter } from "next/navigation";

const SERVICES = [
    { id: "cut", name: "کوتاهی" },
    { id: "color", name: "رنگ مو" },
    { id: "nail", name: "ناخن" },
    { id: "facial", name: "فیشیال" },
];


// یک زمان نمونه برای دمو — در عمل از سرور / پایگاه داده بیار
const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:30"];

export default function StepperReserve() {
    const [step, setStep] = useState(0);
    const router = useRouter();
    const normalizeDigits = (str:string) => str.replace(/[\u06F0-\u06F9]/g, d => 
  String.fromCharCode(d.charCodeAt(0) - 1728)
);

    const [form, setForm] = useState({
        service: "",
        date: "",
        time: "",
        name: "",
        number: "",
        phone: "",
    });

    const steps = [
        { id: 0, title: "انتخاب سرویس" },
        { id: 1, title: "انتخاب تاریخ" },
        { id: 2, title: "انتخاب ساعت" },
        { id: 3, title: "اطلاعات مشتری" },
        { id: 4, title: "بازبینی و ارسال" },
    ];

    const availableTimes = useMemo(() => {
        // در دمو فقط همان TIME_SLOTS برگردان
        // در نسخه واقعی اینجا از سرور/دیتابیس بگیر و فیلتر کن
        return TIME_SLOTS;
    }, [form.date, form.service]);

    function update(changes: { [key: string]: string }) {
        setForm(prev => ({ ...prev, ...changes }));
    }

    function canNext() {
        switch (step) {
            case 0:
                return !!form.service;
            case 1:
                return !!form.date;
            case 2:
                return !!form.time;
            case 3:
                return form.name.trim().length > 0 && form.phone.trim().length >= 8;
            default:
                return true;
        }
    }

    function handleNext() {
        if (!canNext()) return;
        setStep(s => Math.min(s + 1, steps.length - 1));
    }



    function handlePrev() {
        setStep(s => Math.max(s - 1, 0));
    }

          
    function handleComplete(data:any) {
    // برای دمو: می‌تونیم داده‌ها را به localStorage ذخیره کنیم و به صفحه success بریم
    localStorage.setItem("demo_reservation", JSON.stringify(data));
    router.push("/success")
    // در نسخه واقعی: اینجا POST به Supabase/Firebase بزن
  }


    function handleSubmit() {
        // در دمو فقط callback با داده‌ها
        if (handleComplete) handleComplete(form);
    }

    return (
        <div className="w-full flex md:flex-col flex-row items-center justify-between ">
            {/* Stepper header */}
            <div className="flex justify-between gap-4 md:flex-row flex-col mb-6">
                {steps.map((s, i) => {
                    const isCompleted = i < step;
                    const isActive = i === step;
                    return (
                        <div key={s.id} className={"flex mr-2 border-b-2  pb-2 justify-between "+(isCompleted || isActive
                                            ? "border-rose-500 "
                                            : "border-gray-200")}>
                            <div className="flex items-center justify-between gap-3">
                                <div
                                    aria-current={i === step ? "step" : undefined}
                                    className={
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold " +
                                        (isCompleted || isActive
                                            ? "bg-rose-500 text-white"
                                            : "bg-gray-200 text-gray-600")
                                    }
                                >
                                    {isCompleted ? "✓" : i + 1}
                                </div>
                                <div className="text-sm">
                                    <div className={
                                        "text-sm transition " +
                                        (isCompleted || isActive
                                            ? "text-rose-600 font-semibold"
                                            : "text-gray-500")}>
                                        {s.title}
                                    </div>
                                </div>
                            </div>
                            {i !== steps.length - 1 && (
                                <div className={"h-1 mt-3 bg-gray-100 rounded-full transition" +
                                    (isCompleted ? "bg-rose-300" : "bg-gray-100")
                                } />
                            )}
                        </div>
                    )
                })}
            </div>

         <section className="w-[70%]">
               {/* Step content */}
            <div className="min-h-[220px] m-5">
                {step === 0 && (
                    <div>
                        <h3 className="text-lg font-medium mb-3">کدام خدمت را می‌خواهید؟</h3>
                        <div className="grid md:grid-cols-2 md:gap-3  gap-2">
                            {SERVICES.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => update({ service: s.id })}
                                    className={
                                        "p-4 rounded-lg border text-right transition " +
                                        (form.service === s.id
                                            ? "bg-rose-50 border-rose-300"
                                            : "bg-white border-gray-200 hover:shadow")
                                    }
                                >
                                    <div className="font-medium">{s.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg flex  font-medium mb-3">یک تاریخ انتخاب کنید</h3>
                        <Calendar onSelect={(d) => update({ date: d })} />
                        {/* <input
                            type="date"
                            className="border rounded p-2"
                            value={form.date}
                            onChange={e => update({ date: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            (در دمو محدود به انتخاب تاریخ است — در نسخه واقعی تاریخ‌های پر شده را از سرور بگیر)
                        </p> */}
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h3 className="text-lg font-medium mb-3">ساعت مناسب را انتخاب کنید</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {availableTimes.map(t => (
                                <button
                                    key={t}
                                    onClick={() => update({ time: t })}
                                    className={
                                        "p-2 rounded-md text-sm border border-gray-300 " +
                                        (form.time === t ? "bg-rose-500 text-white border-rose-600" : "bg-white text-gray-600")
                                    }
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h3 className="text-lg font-medium mb-3">اطلاعات مشتری</h3>
                        <div className="grid grid-cols-1 gap-3">
                            
                            <input
                                placeholder="نام و نام خانوادگی"
                                value={form.name}
                                onChange={e => update({ name: normalizeDigits(e.target.value) })}
                                className="border rounded p-2 outline-rose-500"
                                pattern="^[\u0600-\u06FF\s]{2,40}$"
                            />
                            <input
                                placeholder="09XXXXXXXXX"
                                value={form.phone}
                                onChange={e => update({ phone: e.target.value })}
                                className="border rounded p-2 outline-rose-500"
                                type="tel"
                                pattern="^(?:\+98|0)?9\d{9}$"
                            />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h3 className="text-lg font-medium mb-3">بازبینی نهایی</h3>
                        <div className="space-y-2 text-sm">
                            <div>
                                <strong>خدمت:</strong>{" "}
                                <span className="text-[15px] mr-2  text-gray-600">{SERVICES.find(s => s.id === form.service)?.name ?? "-"}</span>
                            </div>
                            <div>
                                <strong>تاریخ:</strong> <span className="text-[15px] mr-2 text-gray-600">{form.date || "-"}</span> 
                            </div>
                            <div>
                                <strong>ساعت:</strong> <span className="text-[15px] mr-2 text-gray-600">{form.time || "-"}</span> 
                            </div>
                            <div>
                                <strong>نام:</strong> <span className="text-[15px] mr-2 text-gray-600 ">{form.name || "-"}</span>
                            </div>
                            <div>
                                <strong>موبایل:</strong> <span className="text-[15px] mr-2 text-gray-600">{form.phone || "-"}</span> 
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                            **
                            رزرو بعد از  <span className="text-rose-400"> پرداخت</span> قطعی می‌شود
                            **
                        </p>
                        {/* <p className="text-xs text-gray-500 mt-3">
                            در دمو این مرحله فقط اطلاعات را به callback ارسال می‌کند.
                        </p> */}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-around mt-6">
                <div>
                    <button
                        onClick={handlePrev}
                        disabled={step === 0}
                        className={
                            "px-4 py-2 rounded-md border " +
                            (step === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50")
                        }
                    >
                        قبلی
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {step < steps.length - 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!canNext()}
                            className={
                                "px-5 py-2 rounded-md text-white font-medium " +
                                (canNext() ? "bg-rose-500 hover:bg-rose-600" : "bg-gray-300 cursor-not-allowed")
                            }
                        >
                            مرحله بعد
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-5 py-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-medium"
                        >
                            ثبت نهایی
                        </button>
                    )}
                </div>
            </div>
         </section>
        </div>
    );
}
