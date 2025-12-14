"use client"

import { useState } from 'react';
import { SlScreenSmartphone } from "react-icons/sl";
import { TbLoaderQuarter } from "react-icons/tb";
import { RiArrowRightLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';


interface PhoneLoginProps {
  onSuccess: () => void;
}
// { onSuccess }: PhoneLoginProps
export const LoginPage = () => {
  const router = useRouter();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!phoneNumber || phoneNumber.length < 10) {
        throw new Error('لطفا شماره موبایل معتبر وارد کنید');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        throw new Error('کد تایید باید 6 رقم باشد');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      router.push("/admin")
      // onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-br from-pink-300 to-rose-500 p-4 rounded-2xl">
              <SlScreenSmartphone className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            خوش آمدید
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {step === 'phone'
              ? 'لطفا شماره موبایل خود را وارد کنید'
              : 'کد تایید ارسال شده را وارد نمایید'}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  شماره موبایل
                </label>
                <input
                  id="phone"
                  type="tel"
                  dir="ltr"
                  placeholder="09XXXXXXXXX"
                  value={phoneNumber}
                  pattern='^(?:\+98|0)?9[0-9]{9}$'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-none transition-all text-center text-2xl tracking-widest "
                />
              </div>

              <button
                type="submit"
                disabled={loading || !phoneNumber}
                className="w-full bg-gradient-to-r from-pink-300 to-rose-500 text-white py-3 rounded-xl font-medium hover:from-pink-500 hover:to-rose-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <TbLoaderQuarter className="w-5 h-5 animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    <RiArrowRightLine className="w-5 h-5" />
                    ارسال کد تایید
                  </>
                )}
              </button>
              <p className='text-gray-500 text-[12px] text-center'> در صورت داشتن نوبت یا ثبت نوبت در گذشته نوبت لطفا باشماره ثبت شده وارد شوید</p>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  کد تایید 6 رقمی
                </label>
                <input
                  id="otp"
                  type="text"
                  dir="ltr"
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-center text-2xl tracking-widest font-bold"
                  disabled={loading}
                  autoFocus
                />
                <p className="mt-2 text-sm text-gray-500 text-center">
                  کد به شماره {phoneNumber} ارسال شد
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-pink-300 to-rose-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-rose-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <TbLoaderQuarter className="w-5 h-5 animate-spin" />
                    در حال تایید...
                  </>
                ) : (
                  <>
                    <RiArrowRightLine className="w-5 h-5" />
                    تایید و ورود
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setError('');
                }}
                className="w-full text-gray-600 hover:text-gray-900 py-2 text-sm transition-colors"
              >
                تغییر شماره موبایل
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
