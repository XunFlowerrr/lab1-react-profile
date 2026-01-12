import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main>
          <Routes>
            <Route path="/" element={<Catalog searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
