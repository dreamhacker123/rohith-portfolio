import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // optional, or use 🡅 emoji

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <div
      onClick={scrollToTop}
      className="fixed bottom-6 right-4 md:bottom-6 md:right-6 z-50 bg-gradient-to-r from-black to-gray-900 border-2 border-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-full p-3 shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/50 backdrop-blur-sm transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-110"
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </div>
  ) : null;
}
