
import StepperReserve from "@/component/stepperReserve"



export const metadata = {
  title:"رزرو وقت سالن زیبایی به‌صورت آنلاین",
  describe:"نوبت سالن زیبایی را آنلاین رزرو کنید. انتخاب سرویس، تاریخ و ساعت، پرداخت و ثبت قطعی بدون تماس تلفنی"
};

export default function Reserve(){



    return(
        <div>
            <section className="mt-15 mb-30">
                <StepperReserve />
            </section>
        </div>
    )
}