import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const BlogItem = ({ image, category, title, description, id,_id }) => {
  return (
    <div className="max-w-[330px] border border-black bg-white hover:shadow-[-7px_7px_0px_#000] sm:max-w-[300px]">
      <Link href={`blogs/${id || _id}`}>
        <Image
          src={image}
          alt=""
          width={400}
          height={400}
          className="border-b border-black"
        />
      </Link>
      <p className="ml-5 mt-5 inline-block bg-black px-1 text-sm text-white">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700" dangerouslySetInnerHTML={{__html:description.slice(0,120)}}>
          
        </p>
        <Link href={`blogs/${id}`}>
          <div className="inline-flex items-center py-2 text-center font-semibold">
            Read more{" "}
            <Image
              src={assets.arrow}
              alt=""
              width={12}
              height={12}
              className="ml-2"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
