import { useEffect } from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';

export default function LayoutWrapper({ children, showHeader = true }) {
  useEffect(() => {
    // Scroll to top when component mounts or route changes
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">
      {showHeader && <PublicHeader />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
