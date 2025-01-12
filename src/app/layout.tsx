import "./tailwind.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Container Tracking",
  description: "Track containers in real-time with Next.js and Leaflet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        {/* The children pages (Home, Dashboard) will appear below the navbar */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
