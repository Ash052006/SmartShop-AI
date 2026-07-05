import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
        {/* Navbar */}
        <Navbar />

        {/* Body: Sidebar + Main */}
        <div className="flex flex-1 min-h-0">
          <Sidebar />

          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Future routes go here */}
              {/* <Route path="/history" element={<SessionHistory />} /> */}
              {/* <Route path="/insights" element={<AiInsights />} /> */}
              {/* <Route path="/rules" element={<RuleTrace />} /> */}
            </Routes>

            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
