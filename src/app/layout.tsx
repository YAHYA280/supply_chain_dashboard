import Navbar from "@/components/Navbar";
import "./styles/global.css";

export const metadata = {
  title: "Supply Chain Dashboard",
  description: "Monitor temperature, humidity, and GPS location in real time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
