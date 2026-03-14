import React, { useRef, useState, useEffect, type JSX } from "react";
import { Instagram, Headphones, Dumbbell, Camera } from "lucide-react";

type Hobby = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
  link?: string;
};

const baseHobbies: Hobby[] = [
  {
    id: "art",
    title: "Miniature Art",
    description: "I love creating intricate miniature art pieces.",
    image: "/miniature.jpg",
    icon: <Instagram className="w-12 h-12 text-white" />,
    link: "https://www.instagram.com/microhith.in/",
  },

  {
    id: "sketching",
    title: "Pencil Sketching",
    description: "Graphite & charcoal sketching during calm nights.",
    image: "/art.jpg",
    icon: <Instagram className="w-12 h-12 text-white" />,
    link: "https://www.instagram.com/microhith.in/",
  },
  {
    id: "gym",
    title: "Gym & Fitness",
    description: "Chasing strength, one rep at a time",
    image: "/my_gym.jpeg",
    icon: <Dumbbell className="w-12 h-12 text-white" />,
    link: "https://strava.app.link/MIJuFU9bXUb",
  },
  {
    id: "photography",
    title: "Photography",
    description:
      "Capturing moments through my lens, from landscapes to portraits.",
    image: "/photography.jpg",
    icon: <Camera className="w-12 h-12 text-white" />,
    link: "https://www.instagram.com/rohithedits.in/",
  },
  {
    id: "travel",
    title: "Travel",
    description:
      "Exploring new places, cultures, and cuisines. Every trip is an adventure.",
    image: "/travel.jpg",
    icon: <Instagram className="w-12 h-12 text-white" />,
    link: "https://www.instagram.com/rohithsatyanivas.in/",
  },
  {
    id: "music",
    title: "Listening Music",
    description:
      "Big fan of AR Rahman & Harris Jayaraj. Their music fuels my creativity.",
    image: "/music.jpg",
    icon: <Headphones className="w-12 h-12 text-white" />,
    link: "https://music.amazon.in/profiles/@rohithsatyanivas?ref=dm_sh_wOU3mimjjCircRvzLm6ySSQyF",
  },
];

const hobbies = [...baseHobbies, ...baseHobbies, ...baseHobbies]; // simulate infinite

export const HobbiesSection = (): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const CARD_WIDTH = 624; // 600px + 24px gap
  const centerOffset = baseHobbies.length; // middle block index
  const [activeIndex, setActiveIndex] = useState(centerOffset);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = CARD_WIDTH * index - el.offsetWidth / 2 + CARD_WIDTH / 2;
    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex]);

  const scrollLock = useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent event propagation to the overall page
      
      if (scrollLock.current) return;
  
      scrollLock.current = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextIndex = activeIndex + dir;
      setActiveIndex(nextIndex);
      scrollToIndex(nextIndex);
  
      // Unlock after transition (~400ms)
      setTimeout(() => {
        scrollLock.current = false;
      }, 400);
    };

  const handleClick = (i: number) => {
    const next = centerOffset + i;
    setActiveIndex(next);
    scrollToIndex(next);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
  
    const onScroll = () => {
      const total = hobbies.length;
      const baseLen = baseHobbies.length;
      const modIndex = activeIndex % baseLen;
      if (activeIndex < baseLen || activeIndex >= total - baseLen) {
        const correctedIndex = centerOffset + modIndex;
        setActiveIndex(correctedIndex);
        scrollToIndex(correctedIndex);
      }
    };
  
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [activeIndex, centerOffset]);
  

  return (
    <section
      id="hobbies"
      className="flex flex-col md:flex-row w-full min-h-screen md:h-screen justify-center items-center z-80 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Main Carousel */}
      <div
        className="w-full md:basis-3/4 h-auto md:h-full p-4 md:p-8 flex flex-col justify-center text-white relative overflow-hidden"
      >
        <div
          ref={scrollRef}
          className="relative z-90 w-full h-[300px] md:h-[440px] flex gap-4 md:gap-6 px-2 md:px-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          onWheelCapture={handleWheel}
        >
          {hobbies.map((hobby, index) => {
            const baseIndex = index % baseHobbies.length;
            const isActive = activeIndex % baseHobbies.length === baseIndex;
            return (
              <div
                key={`${hobby.id}-${index}`}
                className={`min-w-[280px] md:min-w-[600px] h-[280px] md:h-[420px] snap-center relative transition-all duration-500 transform rounded-xl shadow group ${
                  isActive ? "scale-100 opacity-100" : "scale-95 opacity-70"
                }`}
              >
                <img
                  src={hobby.image}
                  alt={hobby.title}
                  className="w-full h-full object-cover rounded-xl"
                  style={hobby.id === "gym" ? { objectPosition: "center 30%" } : undefined}
                />
                {hobby.icon && hobby.link && (
                  <a
                    href={hobby.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {hobby.icon}
                  </a>
                )}
                <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center text-center text-white bg-black/40 rounded-b-xl p-2 md:p-4">
                  <h2 className="text-lg md:text-2xl font-bold mb-1">{hobby.title}</h2>
                  <p className="text-xs md:text-sm max-w-[90%]">{hobby.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden md:block md:basis-1/4 h-full p-6 text-red-500 overflow-y-auto bg-gradient-to-br from-black/80 to-gray-900/80 border-l border-red-500/20">
        <h1 className="text-4xl my-4 font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">Hobbies</h1>
        <div className="space-y-2">
          {baseHobbies.map((hobby, i) => (
            <div
              key={hobby.id}
              onClick={() => handleClick(i)}
              className={`block w-full text-left z-90 px-4 py-3 rounded-xl transition-all cursor-pointer font-medium ${
                activeIndex % baseHobbies.length === i
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 transform scale-105"
                  : "hover:bg-red-500/10 backdrop-blur-sm text-gray-300 border border-transparent hover:border-red-500/30"
              }`}
            >
              {hobby.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
