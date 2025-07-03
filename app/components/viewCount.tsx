"use client";

import { useEffect, useState } from "react";

type Props = {
  slug: string;
};

export const ViewCount = ({ slug }: Props) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const increment = async () => {
      try {
        if (process.env.NODE_ENV !== "development") {
          const res = await fetch(`/api/increment-view`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          });
        }

        const countRes = await fetch(`/api/get-views?slug=${slug}`);
        const countData = await countRes.json();

        setCount(countData?.count ?? 0);
      } catch (e) {
        console.error(e);
      }
    };

    increment();
  }, [slug]);

  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {count !== 0 && `${count} views`}
    </p>
  );
};
