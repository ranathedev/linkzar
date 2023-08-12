import React from "react";

import Intro from "components/intro";
import HeroSection from "components/hero-section";
import FAQSection from "components/faq-section";
import CTA from "components/cta";

interface Props {
  theme: string;
}

const Homepage = ({ theme }: Props) => {
  return (
    <div>
      <Intro theme={theme} />
      <HeroSection theme={theme} swap={true} />
      <HeroSection
        theme={theme}
        background="transparent"
        heading="Amplifying Your Reach"
        desc="Expand your digital footprint with our link amplification solutions. Empower your links to resonate across platforms, capturing the attention of a broader audience. With enhanced customization options, you can tailor your links to suit your brand's voice and style. Leverage comprehensive analytics to track and optimize link performance, ensuring that every click counts. Elevate your online presence, connect with more users, and make every link a powerful catalyst for engagement and growth."
      />
      <HeroSection
        theme={theme}
        swap={true}
        heading="Optimizing Your Sharing"
        desc="Unlock the potential of effective sharing with our optimization tools. Craft compelling calls-to-action that drive engagement and conversions. Our platform equips you with advanced customization features, allowing you to create branded short links that resonate with your audience. Real-time analytics provide valuable insights, helping you refine your sharing strategy for maximum impact. Whether it's social media, email campaigns, or any digital channel, our tools enhance your sharing efforts and help you connect with your audience like never before."
      />
      <FAQSection theme={theme} />
      <CTA theme={theme} />
    </div>
  );
};

export default Homepage;
