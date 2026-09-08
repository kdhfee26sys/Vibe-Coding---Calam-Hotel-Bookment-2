import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Hero } from '../../components/Hero/Hero';
import { TrustBar } from '../../components/TrustBar/TrustBar';
import { ProblemSection } from '../../components/ProblemSection/ProblemSection';
import { SolutionSection } from '../../components/SolutionSection/SolutionSection';
import { FeatureBento } from '../../components/FeatureBento/FeatureBento';
import { ProductShowcase } from '../../components/ProductShowcase/ProductShowcase';
import { ROIMetrics } from '../../components/ROIMetrics/ROIMetrics';
import { WhyCalam } from '../../components/WhyCalam/WhyCalam';
import { RoleSolutions } from '../../components/RoleSolutions/RoleSolutions';
import { SecuritySection } from '../../components/SecuritySection/SecuritySection';
import { Testimonials } from '../../components/Testimonials/Testimonials';
import { Pricing } from '../../components/Pricing/Pricing';
import { FAQ } from '../../components/FAQ/FAQ';
import { FinalCTA } from '../../components/FinalCTA/FinalCTA';
import { Footer } from '../../components/Footer/Footer';
import { RevealSection } from '../../components/RevealSection/RevealSection';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ theme, toggleTheme }) => {
  return (
    <div className={styles.landingWrapper}>
      {/* Sticky Top Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Flow */}
      <main className={styles.main}>
        <RevealSection>
          <Hero />
        </RevealSection>
        <RevealSection>
          <TrustBar />
        </RevealSection>
        <RevealSection>
          <ProblemSection />
        </RevealSection>
        <RevealSection>
          <SolutionSection />
        </RevealSection>
        <RevealSection>
          <FeatureBento />
        </RevealSection>
        <RevealSection>
          <ProductShowcase />
        </RevealSection>
        <RevealSection>
          <ROIMetrics />
        </RevealSection>
        <RevealSection>
          <WhyCalam />
        </RevealSection>
        <RevealSection>
          <RoleSolutions />
        </RevealSection>
        <RevealSection>
          <SecuritySection />
        </RevealSection>
        <RevealSection>
          <Testimonials />
        </RevealSection>
        <RevealSection>
          <Pricing />
        </RevealSection>
        <RevealSection>
          <FAQ />
        </RevealSection>
        <RevealSection>
          <FinalCTA />
        </RevealSection>
      </main>

      {/* Global Footer */}
      <RevealSection>
        <Footer />
      </RevealSection>
    </div>
  );
};
