export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-3xl px-4">{children}</div>;
}
