import {LoginPage}  from "@/component/loginPage";

export const dynamic = "force-dynamic"; // عدم کش برای صفحات auth

export default function Login() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginPage />
        <p className="my-6 text-center text-sm text-gray-600">
          با ورود به سامانه، شما{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            قوانین و مقررات
          </a>{" "}
          را می‌پذیرید
        </p>
      </div>
    </div>
  );
}