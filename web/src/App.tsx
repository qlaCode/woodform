import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import BlogArticle from "./components/BlogArticle";
import BlogCardList from "./components/BlogCardList";
import Contact from "./components/Contact";
import { Footer } from "./components/Footer";
import { GalleryProvider } from "./components/GalleryContext";
import Header from "./components/Header";
import { LanguageProvider } from "./components/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <LanguageProvider>
      <GalleryProvider>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow pt-32 max-w-7xl mx-auto px-4 w-full">
            <Routes>
              <Route path="/" element={<BlogCardList />} />
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
