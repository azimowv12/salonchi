import { FaHome, FaThLarge, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import Link from "next/link";

export default function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-sm flex justify-around items-center py-2 md:hidden z-50">
      <Link href="/" className="flex flex-col items-center text-orange-600">
        <FaHome size={20} />
        <span className="text-xs mt-1">Bosh sahifa</span>
      </Link>

      <Link href="/katalog" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
        <FaThLarge size={20} />
        <span className="text-xs mt-1">Katalog</span>
      </Link>

      <Link href="/savat" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
        <FaShoppingCart size={20} />
        <span className="text-xs mt-1">Savat</span>
      </Link>

      <Link href="/sevimli" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
        <FaHeart size={20} />
        <span className="text-xs mt-1">Sevimlilar</span>
      </Link>

      <Link href="/profil" className="flex flex-col items-center text-gray-500 hover:text-orange-600">
        <FaUser size={20} />
        <span className="text-xs mt-1">Profil</span>
      </Link>
    </div>
  );
}
