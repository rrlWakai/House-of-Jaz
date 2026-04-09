import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { TrustBar } from '@/components/trust-bar';
import { AboutUs } from '@/components/about-us';
import { ImageGallery } from '@/components/image-gallery';
import { Packages } from '@/components/packages';
import { Testimonials } from '@/components/testimonials';
import { WhyChooseUs } from '@/components/why-choose-us';
import { FinalCTA } from '@/components/final-cta';
import { BookingForm } from '@/components/booking-form';
import { LocationMap } from '@/components/location-map';
import { Footer } from '@/components/footer';
import { MobileBookingCTA } from '@/components/mobile-booking-cta';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

function getPage() {
  return window.location.hash === '#admin' ? 'admin' : 'home';
}

export default function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const handler = () => setPage(getPage());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (page === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <main className="w-full">
      <Navbar />
      <Hero />
      <TrustBar />
      <AboutUs />
      <ImageGallery />
      <Packages />
      <Testimonials />
      <WhyChooseUs />
      <FinalCTA />
      <BookingForm />
      <LocationMap />
      <Footer />
      <MobileBookingCTA />
    </main>
  );
}
