const navLinks = [
  { name: "About", href: "#about" },
  { name: "Hobbies", href: "#hobbies" },
  { name: "Experience", href: "#professional-experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#social-media" },
];

export default function Navbar() {
  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-2 md:top-6 md:right-6 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 z-[200]">
      <div className="bg-black/50 backdrop-blur-xl rounded-full border border-red-500/20 shadow-xl shadow-red-500/10">
        <div className="flex justify-center md:justify-end items-center h-9 md:h-12 px-3 md:px-8">
          {/* Navigation - Responsive */}
          <div className="flex items-center gap-3 md:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative text-gray-200 hover:text-red-400 text-xs md:text-sm font-medium transition-all duration-300 group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute top-1/2 -translate-y-1/2 -left-3 w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 hidden md:block"></span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}