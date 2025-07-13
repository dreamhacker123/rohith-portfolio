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
      className="fixed bottom-6 font-bold right-6 z-50 themed-bg-yellow hover:bg-white/20 themed-text-purple rounded-full p-3 shadow-xl backdrop-blur-sm transition-all duration-300"
    >
      <ArrowUp className="w-5 h-5" />
    </div>
  ) : null;
}
