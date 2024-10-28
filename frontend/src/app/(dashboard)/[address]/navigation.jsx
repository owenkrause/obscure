"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const { address } = useParams();
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full border-b-[1px] py-2">
      <ul className="flex justify-center gap-2">
        <li
          className={
            isActive(`/${address}/posts`) ? "active" : "text-muted-foreground"
          }
        >
          <Link className="px-4 py-2" href={`/${address}/posts`}>
            Posts
          </Link>
        </li>
        <li
          className={
            isActive(`/${address}/subscriptions`)
              ? "active"
              : "text-muted-foreground"
          }
        >
          <Link className="px-4 py-2" href={`/${address}/subscriptions`}>
            Manage Subscriptions
          </Link>
        </li>
      </ul>
    </nav>
  );
}
