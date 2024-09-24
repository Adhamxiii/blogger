"use client";

import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const res = await axios.post("/api/email", formData);
    if (res.data.success) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    } else {
      toast.error("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <div className="p-5 md:px-12 lg:px-28">
      <div className="flex items-center justify-between">
        <Image
          src={assets.logo}
          alt="logo"
          width={180}
          height={60}
          className="w-[130px] sm:w-auto"
        />
        <Link href="/admin" >
          <button className="flex items-center gap-2 border border-solid border-black px-3 py-1 font-medium shadow-[-7px_7px_0px_#000] sm:px-6 sm:py-3">
            Get started{" "}
            <Image src={assets.arrow} alt="arrow" width={20} height={20} />
          </button>
        </Link>
      </div>
      <div className="my-8 text-center">
        <h1 className="text-3xl font-medium sm:text-5xl">Latest Blogs</h1>
        <p className="m-auto mt-10 max-w-[740px] text-xs sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <form
          className="mx-auto mt-10 flex max-w-[500px] scale-75 justify-between border border-black shadow-[-7px_7px_0px_#000] sm:scale-100"
          onSubmit={submitHandler}
        >
          <input
            className="w-full pl-4 outline-none"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="border-l border-black p-4 active:bg-gray-600 active:text-white sm:px-8"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
