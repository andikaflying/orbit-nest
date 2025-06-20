import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AIAssistant from "./components/AIAssistant";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import WorkflowVisualization from "./pages/WorkflowVisualization";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
