import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AppNavbar() {
  return (
    <>
      <nav className="flex justify-between items-center bg-background p-4 max-w-6xl mx-auto sticky top-0 z-50">
        <Link href="/">
          <h1 className="font-bold uppercase">World Memories</h1>
        </Link>

        <div id="navigation">
          <ul className="flex gap-4 items-center">
            <li className="text-sm hover:text-indigo-400">
              <Link href="/series">Series</Link>
            </li>
            <li className="text-sm hover:text-indigo-400">
              <Link href="/shop">Boutique</Link>
            </li>
            <li className="text-sm hover:text-indigo-400">
              <Link href="/inventory">Inventaire</Link>
            </li>
            <li>
              <Avatar>
                <AvatarFallback>WM</AvatarFallback>
                <AvatarImage
                  src="/assets/images/avatar.jpg"
                  alt="WM Admin"
                />
              </Avatar>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
