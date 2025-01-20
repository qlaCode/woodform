import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import BlogArticle from "./components/BlogArticle";
import BlogCardList from "./components/BlogCardList";

function App() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 m-6">
      <Link to="/" className="relative">
        <div className="flex flex-row items-center relative">
          <img
            src="./src/assets/woodpecker.gif"
            alt="Woodpecker"
            className="w-16 absolute right-full top-1/2 -translate-y-1/2"
          />
          <h1 className="text-[#10A588] text-5xl font-mono">Woodform</h1>
        </div>
      </Link>
      <h3 className="text-slate-800 text-xl font-mono">Quentin Lamare</h3>
      <Routes>
        <Route path="/" element={<BlogCardList />} />
        <Route path="/article/:id" element={<BlogArticle />} />
      </Routes>
    </main>
  );
}

export default App;
