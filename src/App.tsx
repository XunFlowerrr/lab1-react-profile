import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import CartPage from "@/pages/Cart";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCartClick={() => setIsCartOpen(true)}
        />
        <main>
          <Routes>
            <Route path="/" element={<Catalog searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;
