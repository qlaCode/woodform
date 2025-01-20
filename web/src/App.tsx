import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import BlogArticle from "./components/BlogArticle";
import BlogCardList from "./components/BlogCardList";

function App() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 m-6">
      <img
        src="/woodpecker.gif"
        alt="Woodpecker"
        className="fixed top-4 right-0 w-16"
      />
      <Link to="/">
        <h1 className="text-[#10A588] text-4xl font-mono font-medium">
          Woodform
        </h1>
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
