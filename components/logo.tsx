import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

export const Logo = ({ size = 40 }: { size?: number }) => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center hidden md:flex">
        <Image src="/logo.png" alt="Logo" height={size} width={size} />
      </div>
    </Link>
  );
};
