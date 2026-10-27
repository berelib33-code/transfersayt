import React, { useState, useEffect } from 'react';
import { NavPage, Subscriber } from './types';
import { Header } from './components/Header';
import { LiveStatusBar } from './components/LiveStatusBar';
import { SubscriberAuthModal } from './components/SubscriberAuthModal';
import { Footer } from './components/Footer';
import { WhatsAppFloatingWidget } from './components/WhatsAppFloatingWidget';
import { MobileBottomNav } from './components/MobileBottomNav';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { HistoryPage } from './pages/HistoryPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [currentSubscriber, setCurrentSubscriber] = useState<Subscriber | null>(() => {
    try {
      const saved = localStorage.getItem('mih_subscriber');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return null;
  });

  // Fetch subscribers from backend
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch('/api/subscribers');
        if (res.ok) {
          const data = await res.json();
          if (data?.subscribers && Array.isArray(data.subscribers)) {
            setSubscribers(data.subscribers);
          }
        }
      } catch (e) {
        // Fallback
      }
    };

    fetchSubscribers();
    const timer = setInterval(fetchSubscribers, 20000);
    return () => clearInterval(timer);
  }, []);

  const handleLoginSuccess = (sub: Subscriber) => {
    setCurrentSubscriber(sub);
    try {
      localStorage.setItem('mih_subscriber', JSON.stringify(sub));
    } catch (e) {
      // Ignore
    }
    setSubscribers((prev) => [sub, ...prev.filter((s) => s.email !== sub.email)]);
  };

  const handleLogout = () => {
    setCurrentSubscriber(null);
    try {
      localStorage.removeItem('mih_subscriber');
    } catch (e) {
      // Ignore
    }
  };

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-[#F5F7FA] flex flex-col font-sans selection:bg-[#00F5D4] selection:text-[#07090D] pb-16 lg:pb-0">
      {/* Unified Live Rates & Subscriber Top Bar */}
      <LiveStatusBar
        currentSubscriber={currentSubscriber}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Header with Circular Rotating Logo and Original WhatsApp */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentSubscriber={currentSubscriber}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuChange={setMobileMenuOpen}
      />

      {/* Dynamic Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            currentSubscriber={currentSubscriber}
          />
        )}
        {currentPage === 'calculator' && (
          <CalculatorPage
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'who-we-are' && (
          <WhoWeArePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'history' && (
          <HistoryPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'faq' && (
          <FaqPage
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      <WhatsAppFloatingWidget />
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenMenu={() => setMobileMenuOpen(true)}
        currentSubscriber={currentSubscriber}
      />

      {/* Subscriber Registration Modal with Twilio alert integration */}
      <SubscriberAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentSubscriber={currentSubscriber}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
    </div>
  );
}
