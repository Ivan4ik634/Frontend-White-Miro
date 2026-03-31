'use client';
import { AboutSection } from './AboutSection';
import { CallToActionSection } from './CallToActionSection';
import { FeaturesSection } from './FeaturesSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { WhatItWorkSection } from './WhatItWorkSection';

interface Props {}

export const PreviewPage: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col relative gap-y-5">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <WhatItWorkSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};
