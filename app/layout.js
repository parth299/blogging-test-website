import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "CodeBlogz",
  description: "CodeBlogz, the lastest technology trends inside blogs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
