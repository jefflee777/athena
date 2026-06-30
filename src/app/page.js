'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, ArrowRight, Layers, Globe, TrendingUp, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import BentoSection from '@/components/landing/BentoSection';
import EcosystemMarquee from '@/components/landing/EcosystemMarquee';
import LiveProtocolStats from '@/components/landing/LiveProtocolStats';
import AiCopilotShowcase from '@/components/landing/AiCopilotShowcase';
import FaqSection from '@/components/landing/FaqSection';
import CtaSection from '@/components/landing/CtaSection';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BentoSection />
      <EcosystemMarquee />
      <LiveProtocolStats />
      <AiCopilotShowcase />
      <FaqSection />
      {/* <CtaSection /> */}
      <Footer />
    </div>
  );
}
