'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { TrustBar } from '@/components/trust-bar';
import { ExperienceGrid } from '@/components/experience-grid';
import { ImageGallery } from '@/components/image-gallery';
import { Packages } from '@/components/packages';
import { AboutUs } from '@/components/about-us';
import { Testimonials } from '@/components/testimonials';
import { BookingForm } from '@/components/booking-form';
import { FinalCTA } from '@/components/final-cta';
import { Footer } from '@/components/footer';
import { MobileBookingCTA } from '@/components/mobile-booking-cta';

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <Hero />
      <TrustBar />
      <ExperienceGrid />
      <ImageGallery />
      <Packages />
      <AboutUs />
      <Testimonials />
      <BookingForm />
      <FinalCTA />
      <Footer />
      <MobileBookingCTA />
    </main>
  );
}
