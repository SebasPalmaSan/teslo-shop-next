import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo{" "}
        </span>
        <span>| Shop </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link href="/">
        <span className="ml-2">| Privacidad & Legal</span>
      </Link>

      {/* <Link href="https://portfolio-sebastian-palma.vercel.app/">
        <span className="m-2">| Web realizado por Sebastián Palma Sánchez</span>
      </Link> */}
    </div>
  );
};
