import type { JSX } from "react";
import GradientText from "./GradientText"
import PhotoBanner from "./PhotoBanner"
import PillButton from "./PillButton"

export const HomeSection= ({name,taglineWords}:{name:string;taglineWords:string[]}):JSX.Element => {


      const scrollToAbout = () => {
        document
          .getElementById("more-about-me")
          ?.scrollIntoView({ behavior: "smooth" });
      };
    return(
        <section className="h-screen flex flex-col justify-center z-80 items-center p-0">
        <PhotoBanner />
        <h2 className="my-2 name-tag text-6xl z-80">{name}</h2>
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={10}
          showBorder={false}
          className="custom-class"
        >
          {taglineWords.join(" ★ ")}
        </GradientText>
        <PillButton
          label="More About Me"
          onClick={scrollToAbout}
        />
      </section>
    )

}