import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function LayoutBlog({ children }: { children: any }) {
  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <main className="max-w-6xl mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
}
