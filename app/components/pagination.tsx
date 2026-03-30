import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 pt-10">
      <Link
        href={`${basePath}?page=${currentPage - 1}`}
        className={[
          "px-3 py-1.5 text-sm font-mono rounded-md transition-colors",
          currentPage <= 1
            ? "pointer-events-none text-neutral-300 dark:text-neutral-700"
            : "text-neutral-500 hover:text-foreground dark:text-neutral-400 dark:hover:text-neutral-100",
        ].join(" ")}
        aria-disabled={currentPage <= 1}
      >
        ←
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={[
            "w-8 h-8 flex items-center justify-center text-sm font-mono rounded-md transition-colors",
            page === currentPage
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "text-neutral-500 hover:text-foreground dark:text-neutral-400 dark:hover:text-neutral-100",
          ].join(" ")}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`${basePath}?page=${currentPage + 1}`}
        className={[
          "px-3 py-1.5 text-sm font-mono rounded-md transition-colors",
          currentPage >= totalPages
            ? "pointer-events-none text-neutral-300 dark:text-neutral-700"
            : "text-neutral-500 hover:text-foreground dark:text-neutral-400 dark:hover:text-neutral-100",
        ].join(" ")}
        aria-disabled={currentPage >= totalPages}
      >
        →
      </Link>
    </div>
  );
}
