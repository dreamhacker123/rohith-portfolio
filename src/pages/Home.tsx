import PageWrapper from "../components/PageWrapper";
import { MoreAboutSection } from "../components/MoreAboutSection";
import Aurora from "../components/Aurora";
import { HomeSection } from "../components/HomeSection";
import { AboutSection } from "../components/AboutSection";
import SplashCursor from "../components/SplashCursor";
import BackToTop from "../components/BackToTop";
import { HobbiesSection } from "../components/HobbiesSection";
import { ProfessionalExperienceSection } from "../components/ProfessionalExperienceSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SocialMediaSection } from "../components/SocialMediaSection";
import { WriteToMeModal } from "../components/WriteToMeModal";

export const Home: React.FC = () => {
  return (
    <PageWrapper>
      <SplashCursor />
      <Aurora
        colorStops={["#5024FF", "#7CFF67", "#5227FF"]}
        blend={4.0}
        amplitude={0.6}
        speed={2.0}
      />
      <HomeSection
        name={"Rohith Satya Nivas Muchakarla"}
        taglineWords={["Developer", "Miniature Artist", "Engineer"]}
      />

      <MoreAboutSection />
      <AboutSection />
        <HobbiesSection />
      <ProfessionalExperienceSection />
      <SkillsSection />

      <ProjectsSection />

      <SocialMediaSection />
      <WriteToMeModal />
      <BackToTop />
    </PageWrapper>
  );
};
