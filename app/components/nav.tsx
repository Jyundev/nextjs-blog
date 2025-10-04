import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/note": {
    name: "note",
  },
};

export function Navbar() {
  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex items-center justify-between px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex space-x-4">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="relative transition-all hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center py-1 px-2
                       after:content-[''] after:absolute after:left-2 after:right-2 after:bottom-0 after:h-[1px] after:bg-neutral-400 dark:after:bg-neutral-600
                       after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition-transform after:duration-300"
              >
                {name}
              </Link>
            ))}
          </div>
          <ThemeSwitcher />
        </nav>
      </div>
    </aside>
  );
}
