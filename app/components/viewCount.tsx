import { getViewsCount, incrementView } from "app/db/query";

type Props = {
  slug: string;
};
export const ViewCount = async ({ slug }: Props) => {
  // 조회수 증가
  // await incrementView(slug);
  const view = await getViewsCount(slug);
  const count = view.count;

  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {count != 0 && `${count} views`}
    </p>
  );
};
