import PageWrapper from "../components/PageWrapper";
import Navbar from "../components/Navbar";
import { HomeSection } from "../components/HomeSection";
import { AboutSection } from "../components/AboutSection";
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
      <Navbar />
      <HomeSection
        name={"Rohith Satya Nivas Muchakarla"}
        taglineWords={["Developer", "Miniature Artist", "Engineer"]}
      />

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
