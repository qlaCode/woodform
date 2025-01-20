import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogArticle from "./components/BlogArticle";
import BlogCardList from "./components/BlogCardList";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="pt-32 max-w-7xl mx-auto px-4">
        <Header />
        <Routes>
          <Route path="/" element={<BlogCardList />} />
          <Route path="/article/:id" element={<BlogArticle />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
