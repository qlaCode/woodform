import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <main className={`flex-grow w-full ${isHomePage ? '' : 'pt-32 max-w-7xl mx-auto px-4'}`}>
      {children}
    </main>
  );
}