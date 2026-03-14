import type { JSX } from "react";
import GradientText from "./GradientText"
import PhotoBanner from "./PhotoBanner"
import PillButton from "./PillButton"

export const HomeSection= ({name,taglineWords}:{name:string;taglineWords:string[]}):JSX.Element => {


      const scrollToAbout = () => {
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
      };
    return(
        <section id="home" className="min-h-screen m-0 flex flex-col justify-center z-80 items-center p-4 md:p-0 pt-16 md:pt-4 relative overflow-hidden">
        {/* Chinese Temple Background Image - Red/Dark theme */}
        <div 
          className="absolute inset-0 opacity-55 pointer-events-none"
          style={{
            backgroundImage: 'url(/orange-silhoutte.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
            filter: 'sepia(1) hue-rotate(330deg) saturate(2.5) brightness(0.5) contrast(1.6)'
          }}
        ></div>
        {/* Layer 2: Red highlights */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to left, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.5) 50%, transparent 70%), url(/orange-silhoutte.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'soft-light',
            filter: 'sepia(0.8) hue-rotate(335deg) saturate(2.5) brightness(0.6)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 pointer-events-none"></div>
        <div className="relative z-10">
        <PhotoBanner />
        <h2 className="my-4 name-tag text-3xl sm:text-4xl md:text-5xl lg:text-6xl z-80 text-center px-4 font-bold text-white drop-shadow-lg">{name}</h2>
        <GradientText
          colors={["#ffffff", "#ef4444", "#dc2626", "#ef4444", "#ffffff"]}
          animationSpeed={10}
          showBorder={false}
          className="custom-class text-xl md:text-2xl"
        >
          {taglineWords.join(" ★ ")}
        </GradientText>
        <PillButton
          label="More About Me"
          onClick={scrollToAbout}
        />
        </div>
      </section>
    )

}