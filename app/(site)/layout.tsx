export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-xl mx-4 lg:mx-auto mt-6 px-2 md:px-0">{children}</div>
  );
}
