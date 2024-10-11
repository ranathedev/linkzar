import React from "react"

import Intro from "components/intro"
import HeroSection from "components/hero-section"
import FAQSection from "components/faq-section"
import CTA from "components/cta"

interface Props {
  theme: string
}

const Homepage = ({ theme }: Props) => (
  <div>
    <Intro theme={theme} />
    <HeroSection theme={theme} swap={true} />
    <HeroSection
      theme={theme}
      background="transparent"
      heading="Amplifying Your Reach"
      desc="Boost your online reach using our link amplification solutions. Spread your links seamlessly across platforms, grabbing a larger audience's interest. Customize links to match your brand's tone. Track and improve link performance with detailed analytics. Elevate your online presence, connect with more users, and turn each link into a tool for engagement and expansion."
    />
    <HeroSection
      theme={theme}
      swap={true}
      heading="Optimizing Your Sharing"
      desc="Maximize sharing impact with our optimization tools. Create engaging calls-to-action for better conversions. Craft branded short links that resonate. Real-time analytics refine your strategy. Elevate your sharing across digital channels, connecting with your audience more effectively."
    />
    <FAQSection theme={theme} />
    <CTA theme={theme} />
  </div>
)

export default Homepage
