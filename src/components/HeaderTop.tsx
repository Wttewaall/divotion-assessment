import Image from "next/image";
import FavoritesSheet from "./FavoritesSheet";

export default function HeaderTop() {
    return (
        <header className="container mx-auto">
            <div className="flex row justify-between py-5">
                <Image src="acme-logo-1.svg" width={100} height={36} alt="Acme" className="inline"></Image>
                <FavoritesSheet></FavoritesSheet>
            </div>
        </header>
    );
}