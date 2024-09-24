import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100">
      <Link href='/'>
        <div className="border border-black px-2 py-3 sm:pl-14">
          <Image src={assets.logo} alt="logo" width={120} />
        </div>
      </Link>
      <div className="relative h-[100vh] w-28 border border-black py-12 sm:w-80">
        <div className="absolute right-0 w-1/2 sm:w-[80%]">
          <Link href='/admin/addProduct' className="flex items-center gap-3 border border-black bg-white px-3 py-2 font-medium shadow-[-5px_5px_0px_#000]">
            <Image src={assets.add_icon} alt="" width={28} />
            <p>Add blogs</p>
          </Link>
          <Link href='/admin/blogList' className="mt-5 flex items-center gap-3 border border-black bg-white px-3 py-2 font-medium shadow-[-5px_5px_0px_#000]">
            <Image src={assets.blog_icon} alt="" width={28} />
            <p>Blog list</p>
          </Link>
          <Link href='/admin/subscriptions' className="mt-5 flex items-center gap-3 border border-black bg-white px-3 py-2 font-medium shadow-[-5px_5px_0px_#000]">
            <Image src={assets.email_icon} alt="" width={28} />
            <p>Subscription</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
