import { Popup } from "@/component/popup";
import { Search } from "@/component/search";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function AdminLayout(
    {
  children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    return(
        <div className="w-full flex flex-col">
            <div className="flex justify-between m-5">
           <Search/>
            <Popup/>
        </div>
        <div>
            {children}
        </div>
        </div>
    )
}