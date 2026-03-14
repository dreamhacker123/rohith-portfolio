import { InfiniteScrollSection } from "./InfiniteScrollSection";

export const MoreAboutSection: React.FC = () => {
  return (
    <section
      id="more-about-me"
      style={{
        background: `linear-gradient(162deg, transparent 50%, white 50%)`,
      }}
      className="flex w-full min-h-screen md:h-screen justify-center py-8 md:py-0"
    >

      <InfiniteScrollSection />
    </section>
  );
};
