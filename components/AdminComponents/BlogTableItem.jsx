import { assets } from "@/assets/assets";
import Image from "next/image";

const BlogTableItem = ({
  author_img,
  title,
  date,
  author,
  deleteBlog,
  _id,
}) => {
  const BlogDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <tr className="border-b bg-white">
      <th
        scope="row"
        className="hidden items-center gap-3 whitespace-nowrap px-6 py-4 font-medium text-gray-900 sm:flex"
      >
        <Image
          src={author_img ? author_img : assets.profile_icon}
          alt=""
          width={40}
          height={40}
        />
        <p>{author ? author : "No author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "no title"}</td>
      <td className="px-6 py-4 text-xs">{BlogDate}</td>
      <td className="cursor-pointer px-6 py-4" onClick={() => deleteBlog(_id)}>
        x
      </td>
    </tr>
  );
};

export default BlogTableItem;
