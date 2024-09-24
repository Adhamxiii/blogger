"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import axios from "axios";

const SingleBlog = ({ params }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/blog`, {
        params: {
          id: params.id,
        },
      });
      const data = await res.data.data;
      setData(data);
    };

    fetchData();
  }, [params.id]);

  console.log(data);

  return data ? (
    <>
      <div className="bg-gray-200 p-5 md:px-12 lg:px-28">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={assets.logo}
              alt=""
              width={180}
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <Link href='/admin'>
            <button className="flex items-center gap-2 border border-solid border-black px-3 py-1 font-medium shadow-[-7px_7px_0px_#000] sm:px-6 sm:py-3">
              Get started
              <Image src={assets.arrow} alt="arrow" width={20} height={20} />
            </button>
          </Link>
        </div>

        <div className="my-24 text-center">
          <h1 className="mx-auto max-w-[700px] text-2xl font-semibold sm:text-5xl">
            {data.title}
          </h1>
          <Image
            src={data.author_img}
            alt=""
            width={60}
            height={60}
            className="mx-auto mt-6 rounded-full border border-white"
          />
          <p className="mx-auto mt-1 max-w-[740px] pb-2 text-lg">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 mb-10 mt-[-100px] max-w-[800px] md:mx-auto">
        <Image
          src={data.image}
          alt=""
          width={1280}
          height={720}
          className="border-4 border-white"
        />

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="my-24">
          <p className="my-4 font-semibold text-black">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <Image src={assets.facebook_icon} alt="" width={50} />
            <Image src={assets.twitter_icon} alt="" width={50} />
            <Image src={assets.googleplus_icon} alt="" width={50} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <></>
  );
};

export default SingleBlog;
