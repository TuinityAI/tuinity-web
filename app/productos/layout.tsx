import { ProductNav } from "./_nav";

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProductNav />
      {children}
    </>
  );
}
