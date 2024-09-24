"use client";

import { blog_data } from "@/assets/assets";
import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get("/api/blog");
      setBlogs(res.data.data);
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="my-10 flex justify-center gap-6">
        <button
          className={
            menu === "All" && "rounded-sm bg-black px-4 py-1 text-white"
          }
          onClick={() => setMenu("All")}
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology" && "rounded-sm bg-black px-4 py-1 text-white"
          }
        >
          Technology
        </button>
        <button
          className={
            menu === "Startup" && "rounded-sm bg-black px-4 py-1 text-white"
          }
          onClick={() => setMenu("Startup")}
        >
          Startup
        </button>
        <button
          className={
            menu === "Lifestyle" && "rounded-sm bg-black px-4 py-1 text-white"
          }
          onClick={() => setMenu("Lifestyle")}
        >
          Lifestyle
        </button>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:mx-24 xl:grid-cols-4">
        {/* {blog_data
          .filter((item) => item.category === menu || menu === "All")
          .map((item) => {
            return <BlogItem key={item.id} {...item} />;
          })} */}

        {blogs
          .filter((item) => item.category === menu || menu === "All")
          .map((item) => {
            return <BlogItem key={item._id} {...item} />;
          })}
      </div>
    </div>
  );
};

export default BlogList;
