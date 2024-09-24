import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-around gap-2 bg-black py-5 sm:flex-row sm:gap-0">
      <Image src={assets.logo_light} alt="logo" width={120} />
      <p className="text-sm text-white">
        All Rights Reserved. Copyright ©blogger.
      </p>
      <div className="flex">
        <Image src={assets.facebook_icon} alt="facebook" width={40} />
        <Image src={assets.twitter_icon} alt="twitter" width={40} />
        <Image src={assets.googleplus_icon} alt="instagram" width={40} />
      </div>
    </div>
  );
};

export default Footer;
