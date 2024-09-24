import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
import { blog_data } from "@/assets/assets";
const fs = require("fs");

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

export async function GET(req) {
  const blogId = req.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({ success: true, data: blog });
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ success: true, data: blogs });
  }
}

export async function POST(req) {
  await mkdir("./public", { recursive: true });

  const formData = await req.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imageUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imageUrl}`,
    author_img: `${formData.get("author_img")}`,
  };

  await BlogModel.create(blogData);
  console.log(`Blog Saved`);

  return NextResponse.json({ success: true, msg: "Blog Added" });
}

export async function DELETE(req) {
  try {
    const blogId = req.nextUrl.searchParams.get("id");
    if (!blogId) {
      return NextResponse.json({ success: false, msg: "Blog ID is required" });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" });
    }

    const imagePath = `./public${blog.image}`;
    await fs.promises.unlink(imagePath);

    await BlogModel.findByIdAndDelete(blogId);

    return NextResponse.json({ success: true, msg: "Blog Deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, msg: "Error deleting blog" });
  }
}

const importData = async () => {
  try {
    await BlogModel.deleteMany();

    const sampleBlogs = blog_data.map((blog) => {
      return { ...blog };
    });

    await BlogModel.insertMany(sampleBlogs);

    console.log("Data Imported!");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const destroyData = async () => {
  try {
    await BlogModel.deleteMany();

    console.log("Data Destroyed!");
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

// Add this block to handle command-line arguments
if (import.meta.main) {
  const args = Bun.argv.slice(2);
  if (args.includes("import")) {
    importData().then(() => process.exit());
  } else if (args.includes("destroy")) {
    destroyData().then(() => process.exit());
  } else {
    console.log("Invalid command. Use 'import' or 'destroy'.");
  }
}
