"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";

const navItems = {
  "/": { name: "home" },
  "/blog": { name: "blog" },
  "/note": { name: "note" },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          id="nav"
          className="flex items-center justify-between px-0 pb-0 md:overflow-auto scroll-pr-6 md:relative"
        >
          {/* Left Navigation */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`relative flex items-center py-1 px-2 text-sm font-medium capitalize transition-colors duration-300 ${
                    isActive
                      ? "text-sky-500 dark:text-sky-400"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  }`}
                >
                  <span>{name}</span>
                  {/* underline animation */}
                  <span
                    className={`absolute left-2 right-2 bottom-0 h-[1px] origin-center scale-x-0 transition-transform duration-300 ${
                      isActive
                        ? "bg-sky-500 dark:bg-sky-400 scale-x-100"
                        : "bg-neutral-400 dark:bg-neutral-600 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <ThemeSwitcher />
        </nav>
      </div>
    </aside>
  );
}
