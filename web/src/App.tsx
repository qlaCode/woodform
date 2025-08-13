import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { initGA, trackPageView } from "./analytics";
import "./App.css";
import About from "./components/About";
import BlogArticle from "./components/BlogArticle";
import BlogCardList from "./components/BlogCardList";
import Contact from "./components/Contact";
import Home from "./components/Home";
import { Footer } from "./components/Footer";
import { GalleryProvider } from "./components/GalleryContext";
import Header from "./components/Header";
import { LanguageProvider } from "./components/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA(); // Initialize Google Analytics
  }, []);

  useEffect(() => {
    trackPageView(location.pathname); // Track page views on route change
  }, [location]);

  return (
    <LanguageProvider>
      <GalleryProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-32 max-w-7xl mx-auto px-4 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<BlogCardList />} />
              <Route path="/article/:id" element={<BlogArticle />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <ScrollToTop />
          <Footer />
        </div>
      </GalleryProvider>
    </LanguageProvider>
  );
}

export default App;
