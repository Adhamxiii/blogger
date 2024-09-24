"use client";

import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get("/api/blog");
    setBlogs(res.data.data);
  };

  const deleteBlog = async (id) => {
    const res = await axios.delete("/api/blog", {
      params: {
        id: id,
      },
    });
    toast.success(res.data.msg);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log(blogs);

  return (
    <div className="flex-1 px-5 pt-5 sm:pl-16 sm:pt-12">
      <h1 className="">All blogs</h1>
      <div className="scrollbar-hide relative mt-4 h-[80vh] max-w-[850px] overflow-x-auto border border-gray-400">
        <table className="w-full text-sm text-gray-500">
          <thead className="bg-gray-50 text-left text-sm uppercase text-gray-700">
            <tr>
              <th scope="col" className="hidden px-6 py-3 sm:block">
                Author name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <BlogTableItem key={blog._id} {...blog} deleteBlog={deleteBlog}  />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogListPage;
