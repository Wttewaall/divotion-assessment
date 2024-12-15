import Image from "next/image";
import { WishlistSheet } from "@/components/wishlistSheet";

export function HeaderTop() {
  return (
    <header className="container mx-auto sticky top-0 bg-white z-10">
      <div className="flex row justify-between py-5">
        <Image src="acme-logo-1.svg" width={100} height={36} alt="Acme" className="inline"/>
        <WishlistSheet />
      </div>
    </header>
  );
}