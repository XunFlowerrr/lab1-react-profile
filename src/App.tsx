import { Routes, Route, Navigate } from "react-router-dom";
import ApplyLayout from "@/pages/apply/ApplyLayout";
import Step1 from "@/pages/apply/Step1";
import Step2 from "@/pages/apply/Step2";
import Step3 from "@/pages/apply/Step3";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/apply/step-1" replace />} />
        <Route path="/apply" element={<ApplyLayout />}>
          <Route path="step-1" element={<Step1 />} />
          <Route path="step-2" element={<Step2 />} />
          <Route path="step-3" element={<Step3 />} />
        </Route>
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
