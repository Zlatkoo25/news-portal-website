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
    <section className="flex items-center justify-center min-h-screen 
    bg-cover bg-center min-w-screen"
    style={{ backgroundImage: 'url("/images/auth-bg.jpg")' }}>
      <div className="max-w-80 p-8 bg-white shadow-lg rounded-xl">
        {children}
      </div>
    </section>
  );
}