import { InfiniteScrollSection } from "./InfiniteScrollSection";

export const MoreAboutSection: React.FC = () => {
  return (
    <section
      id="more-about-me"
      style={{
        background: `linear-gradient(162deg, transparent 50%, white 50%)`,
      }}
      className="flex w-full h-screen justify-center"
    >

      <InfiniteScrollSection />
    </section>
  );
};
