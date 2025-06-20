import React from "react";
import { ArrowLeft, ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "../components/ui/button";

const WorkflowVisualization: React.FC = () => {
  const modulatorData = [
    {
      compound: "Albuterol",
      type: "Agonist",
      potency: "EC50: 50 nM",
      clinicalStage: "Approved",
    },
    {
      compound: "Albuterol",
      type: "Agonist",
      potency: "EC50: 50 nM",
      clinicalStage: "Approved",
    },
    {
      compound: "Albuterol",
      type: "Agonist",
      potency: "EC50: 50 nM",
      clinicalStage: "Approved",
    },
    {
      compound: "Albuterol",
      type: "Agonist",
      potency: "EC50: 50 nM",
      clinicalStage: "Approved",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F1F5]">
      {/* Header with back navigation */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-kumi-gray-100">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5 text-kumi-black" />
          </Button>
          <span className="font-red-hat text-lg font-semibold text-kumi-black">
            QSPR project
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-red-hat text-base text-kumi-black">
            Module: Target selection
          </span>
          <div className="bg-kumi-gray-100 px-6 py-2 rounded-full">
            <span className="font-red-hat text-xl text-kumi-black">
              Data is saved
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Workflow Map */}
        <div className="w-full lg:w-[460px] bg-white m-3 rounded-3xl p-6">
          <div className="mb-6">
            <h3 className="font-red-hat text-base font-semibold text-kumi-black mb-4">
              Workflow Focused View
            </h3>

            {/* Workflow Map Container */}
            <div className="bg-kumi-black rounded-2xl p-4 h-48 mb-4 relative">
              <span className="text-white font-red-hat text-sm">
                Workflow Map
              </span>
              {/* Simplified workflow visualization */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-8 bg-kumi-blue-400 rounded border-2 border-kumi-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      Target selection
                    </span>
                  </div>
                  <div className="w-20 h-6 bg-kumi-gray-400 rounded flex items-center justify-center">
                    <span className="text-white text-xs">Filter</span>
                  </div>
                  <div className="w-20 h-6 bg-kumi-gray-400 rounded flex items-center justify-center">
                    <span className="text-white text-xs">Filter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Controls */}
          <div className="space-y-4">
            <div className="bg-kumi-gray-50 rounded-3xl p-4">
              <div className="w-12 h-12 bg-white rounded-xl p-3 mb-4">
                <ChevronLeft className="w-6 h-6 text-kumi-black transform -rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 m-3 mr-6">
          <div className="bg-white rounded-3xl p-6 h-full">
            {/* Module Header */}
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-red-hat text-xl font-bold text-kumi-black">
                Module:
              </h2>
              <h2 className="font-red-hat text-xl font-bold text-kumi-black">
                Target selection
              </h2>
            </div>

            {/* Target Protein Selection */}
            <div className="bg-kumi-gray-100 rounded-3xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-red-hat text-base font-semibold text-kumi-black">
                  Select a Target Protein:
                </span>
                <div className="bg-white rounded-[20px] px-4 py-4 flex items-center justify-between w-[432px]">
                  <span className="font-red-hat text-base text-kumi-black">
                    Beta-2 Adrenergic Receptor (P07550)
                  </span>
                  <ChevronDown className="w-4 h-4 text-kumi-black" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Target Protein Information */}
              <div className="bg-kumi-gray-100 rounded-3xl p-5">
                <h3 className="font-red-hat text-xl font-bold text-kumi-black mb-4">
                  Target Protein Information
                </h3>
                <div className="bg-white rounded-[20px] p-4 space-y-3">
                  <div>
                    <span className="font-red-hat text-base font-bold text-kumi-black">
                      PDB ID:{" "}
                    </span>
                    <span className="font-red-hat text-base text-kumi-black">
                      2R4R
                    </span>
                  </div>
                  <hr className="border-dashed border-kumi-gray-200" />
                  <div>
                    <span className="font-red-hat text-base font-bold text-kumi-black">
                      UniProtKB ID:{" "}
                    </span>
                    <span className="font-red-hat text-base text-kumi-black">
                      P07550
                    </span>
                  </div>
                  <hr className="border-dashed border-kumi-gray-200" />
                  <div>
                    <span className="font-red-hat text-base font-bold text-kumi-black">
                      Function:
                    </span>
                    <span className="font-red-hat text-base text-kumi-black">
                      {" "}
                      The beta-2 adrenergic receptor mediates the
                      catecholamine-induced activation of adenylate cyclase
                      through the action of G proteins.
                    </span>
                  </div>
                </div>

                {/* Protein Structure Visualization */}
                <div className="mt-6 bg-gradient-to-br from-blue-100 to-purple-200 rounded-3xl h-80 flex items-center justify-center">
                  <span className="text-kumi-gray-400 font-red-hat text-sm">
                    Beta-2 Adrenergic Receptor (P07550)
                  </span>
                </div>
              </div>

              {/* Druggability and Known Modulators */}
              <div className="space-y-6">
                {/* Druggability */}
                <div className="bg-kumi-gray-100 rounded-3xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-red-hat text-xl font-bold text-kumi-black">
                      Druggability
                    </h3>
                    <div className="bg-kumi-orange text-white px-8 py-2 rounded-full">
                      <span className="font-red-hat text-xl">
                        score: moderate-low
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-[20px] p-4">
                    <h4 className="font-red-hat text-base font-bold text-kumi-black mb-3">
                      Key factors:
                    </h4>
                    <hr className="border-dashed border-kumi-gray-200 mb-3" />
                    <div className="space-y-3 text-sm">
                      <p className="font-red-hat text-base text-kumi-black">
                        The beta-2 adrenergic receptor mediates the
                        catecholamine-induced activation of adenylate cyclase
                        through the action of G proteins.
                      </p>
                      <hr className="border-dashed border-kumi-gray-200" />
                      <p>
                        <span className="font-bold">GPCR class:</span> Belongs
                        to the well-established class of G-protein-coupled
                        receptors (GPCRs), which are popular drug targets due to
                        their involvement in many physiological processes.
                      </p>
                      <hr className="border-dashed border-kumi-gray-200" />
                      <p>
                        <span className="font-bold">
                          Active site accessibility:
                        </span>{" "}
                        The structure of the Beta-2 adrenergic receptor is
                        well-studied, with multiple binding pockets for agonists
                        and antagonists.
                      </p>
                      <hr className="border-dashed border-kumi-gray-200" />
                      <p>
                        <span className="font-bold">
                          Broad therapeutic implications:
                        </span>{" "}
                        Targeted for conditions like asthma, COPD, and
                        cardiovascular diseases
                      </p>
                    </div>
                  </div>
                </div>

                {/* Known Modulators */}
                <div className="bg-kumi-gray-100 rounded-3xl p-5">
                  <h3 className="font-red-hat text-xl font-bold text-kumi-black mb-4">
                    Known Modulators
                  </h3>
                  <div className="bg-white rounded-[20px] overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 bg-kumi-gray-50 rounded-t-[20px]">
                      <div className="p-4 font-red-hat text-base font-medium text-kumi-black">
                        Compound
                      </div>
                      <div className="p-4 font-red-hat text-base font-medium text-kumi-black">
                        Type
                      </div>
                      <div className="p-4 font-red-hat text-base font-medium text-kumi-black">
                        Potency
                      </div>
                      <div className="p-4 font-red-hat text-base font-medium text-kumi-black">
                        Clinical Stage
                      </div>
                    </div>
                    {/* Table Rows */}
                    {modulatorData.map((row, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-4 border-t border-kumi-gray-100"
                      >
                        <div className="p-4 font-red-hat text-base text-kumi-black">
                          {row.compound}
                        </div>
                        <div className="p-4 font-red-hat text-base text-kumi-black">
                          {row.type}
                        </div>
                        <div className="p-4 font-red-hat text-base text-kumi-black">
                          {row.potency}
                        </div>
                        <div className="p-4 font-red-hat text-base text-kumi-black">
                          {row.clinicalStage}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowVisualization;
