import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import AIAssistant from "./components/AIAssistant";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import WorkflowVisualization from "./pages/WorkflowVisualization";
import NotFound from "./pages/NotFound";
import PDBVisualizationPage from "./pages/PDBVisualizationPage";

function AppContent() {
  const location = useLocation();
  const isProteinPage = location.pathname === "/protein";

  if (isProteinPage) {
    // Full screen layout for protein page
    return (
      <div className="h-screen w-screen">
        <Routes>
          <Route path="/protein" element={<PDBVisualizationPage />} />
        </Routes>
      </div>
    );
  }

  // Normal layout for other pages
  return (
    <div className="h-screen bg-[#F1F1F5]">
      <Header />
      <main className="relative h-full bg-[#F1F1F5] justify-center flex w-full flex-row">
        <Routes>
          <Route path="/" element={<ProjectsDashboard />} />
          <Route path="/projects" element={<ProjectsDashboard />} />
          <Route path="/workflow" element={<WorkflowVisualization />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIAssistant />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
