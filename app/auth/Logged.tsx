"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type } from "os";

type User = {
    image: string;
}
export default function Logged({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
      >
        Sign out
      </button>
      <Link href={"/dashbord"}>
        <Image
          width={64}
          height={64}
          src={image}
          className="w-14 rounded-full"
          alt=""
          priority
        ></Image>
      </Link>
    </li>
  );
}
