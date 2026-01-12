import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { AdminSettings } from "@/pages/AdminSettings";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="admin-settings"
            element={
              <ProtectedRoute requireAdmin>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
