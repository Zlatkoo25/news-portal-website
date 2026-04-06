import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Nextjs Project",
  description: "User login page",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 rounded-xl">
      <div className="w-full p-8 bg-white shadow-lg rounded-xl">
        {children}
      </div>
    </section>
  );
}