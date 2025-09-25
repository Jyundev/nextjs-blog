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
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle py-1 px-2"
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
