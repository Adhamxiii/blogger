"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "startup",
    author: "Adham",
    author_img: "/profile_icon.png",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("author_img", data.author_img);

    const res = await axios.post("/api/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      toast.success(res.data.msg);
    } else {
      toast.error(res.data.msg);
    }

    setImage(false);
    setData({
      title: "",
      description: "",
      category: "startup",
      author: "Adham",
      author_img: "/profile_icon.png",
    });
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="space-y-4 p-5 sm:pl-16 sm:pt-12"
      >
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            width={140}
            height={140}
            className="mt-4"
          />
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
          hidden
        />

        <p className="mt-4 text-xl">Blog Title</p>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Type here"
          value={data.title}
          onChange={inputChangeHandler}
          className="mt-4 w-full border px-4 py-3 sm:w-[500px]"
          required
        />

        <p className="mt-4 text-xl">Blog Description</p>
        <textarea
          id="description"
          name="description"
          placeholder="write content here"
          rows={6}
          value={data.description}
          onChange={inputChangeHandler}
          className="mt-4 w-full border px-4 py-3 sm:w-[500px]"
          required
        />

        <p className="mt-4 text-xl">Blog Category</p>
        <select
          className="mt-4 w-40 border px-4 py-3 text-gray-500"
          name="category"
          id="category"
          value={data.category}
          onChange={inputChangeHandler}
        >
          <option value="startup">Startup</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">LifeStyle</option>
        </select>

        <button
          type="submit"
          className="mt-8 block h-12 w-40 bg-black px-4 py-2 text-white"
        >
          ADD
        </button>
      </form>
    </>
  );
};

export default AddProductPage;
