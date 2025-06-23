import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Fullscreen,
  HelpCircle,
  Maximize,
  Share2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { ProteinData } from "@/types/ProteinData";
import ReactFlow, { Background, Controls } from "reactflow";
import { SpecificWorkflowItem } from "@/types/SpecificWorkflowResponse";
import WorkflowNode from "@/components/WorkflowNode";
import { cn } from "@/lib/utils";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";

const WorkflowVisualization: React.FC = () => {
  const [workflowData, setWorkflowData] = useState<SpecificWorkflowItem>(null);
  const [proteinData, setProteinData] = useState<ProteinData>(null);
  const [hideMain, setHideMain] = useState(false);
  const navigate = useNavigate();

  const fetchWorkflowData = async () => {
    fetch("/assets/get_specific_workflow_result1.json")
      .then((res) => res.json())
      .then((data) => {
        const item = data.body?.item?.[0];
        console.log("Workflow Data fetched: ", data);
        setWorkflowData(item);
      })
      .catch((err) => {
        console.error("Failed to fetch dataset info:", err);
      });
  };

  const fetchProteinData = async () => {
    fetch("/assets/get_specific_dataset_info_result.json")
      .then((res) => res.json())
      .then((data) => {
        const item: ProteinData = data.body?.item?.[0];
        console.log("Protein Data fetched: ", data);
        setProteinData(item);
      })
      .catch((err) => {
        console.error("Failed to fetch dataset info:", err);
      });
  };

  const workflowObj = workflowData ? workflowData.workflow : null;

  const nodes = useMemo(() => {
    return (
      workflowObj &&
      Object.entries(workflowObj).map(([id, node]) => ({
        id,
        type: "workflowNode",
        position: node.position,
        data: {
          display_name: node.display_name,
          module_type: node.module_type,
        },
      }))
    );
  }, [workflowObj]);

  const edges =
    workflowObj &&
    Object.entries(workflowObj)
      .filter(([_, node]) => node.nextNode)
      .map(([id, node]) => ({
        id: `${id}-${node.nextNode}`,
        source: id,
        target: node.nextNode,
        type: "smoothstep",
      }));

  const nodeTypes = {
    workflowNode: WorkflowNode,
  };

  useEffect(() => {
    fetchWorkflowData();
    fetchProteinData();
  }, []);

  return (
    <div className="bg-[#F1F1F5] flex flex-col xl:flex-row mr-3 lg:mr-0 w-full">
      {/* Left Sidebar - Workflow Map */}
      <div
        className={cn(
          "bg-white rounded-2xl m-3 sm:rounded-3xl p-3 sm:p-4 lg:p-6 flex items-center flex-col",
          hideMain ? "w-full 2xl:w-[80vw]" : "xl:w-[400px] 2xl:w-[460px]",
        )}
      >
        <div className="flex items-center justify-between mb-2 w-full">
          <div className="flex flex-row">
            <Button
              variant="ghost"
              className="w-12 h-12 bg-kumi-gray-50 rounded-2xl"
              onClick={() => {}}
            >
              <ChevronLeft className="w-4 h-4 text-kumi-black" />
            </Button>
            <h2 className="ml-2 flex items-center font-poppins text-sm lg:text-xl font-semibold text-kumi-black">
              QSPR Project
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="w-12 h-12 bg-kumi-gray-50 rounded-2xl"
            >
              <Bookmark className="w-6 h-6 text-kumi-gray-300" />
            </Button>
            <Button
              variant="ghost"
              className="w-12 h-12 bg-kumi-gray-50 rounded-2xl"
            >
              <Share2 className="w-6 h-6 text-kumi-gray-300" />
            </Button>
            <Button
              variant="ghost"
              className="w-12 h-12 bg-kumi-gray-50 rounded-2xl"
              onClick={() => {
                setHideMain(!hideMain);
              }}
            >
              <Maximize className="w-6 h-6 text-kumi-black" />
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "bg-kumi-gray-100 rounded-3xl h-[80vh]",
            hideMain
              ? "w-[80vw] md:w-[460px] xl:w-[720px] 2xl:w-[70vw]"
              : "w-[320px] lg:w-[360px]",
          )}
        >
          <ReactFlow
            nodes={nodes || []}
            edges={edges || []}
            nodeTypes={nodeTypes || {}}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn("flex-1 m-3", hideMain ? "hidden" : "flex")}>
        <div className="bg-white rounded-3xl p-6 h-full">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-red-hat text-xl font-bold text-kumi-black">
              Module:
            </h2>
            <h2 className="font-red-hat text-xl font-bold text-kumi-black">
              Target selection
            </h2>
          </div>

          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
            {/* Target Protein Information */}
            <div>
              <div className="bg-kumi-gray-100 rounded-3xl p-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="ml-3 font-red-hat text-base font-semibold text-kumi-black">
                    Select a Target Protein:
                  </span>
                  <div className="bg-white rounded-[20px] px-4 py-4 flex items-center justify-between w-[432px]">
                    <span className="font-red-hat text-base text-kumi-black">
                      {proteinData?.proteinName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-kumi-black" />
                  </div>
                </div>
              </div>
              <div className="bg-kumi-gray-100 rounded-3xl p-2">
                <h3 className="font-red-hat text-xl font-bold text-kumi-black mb-4 ml-2 mt-3">
                  Target Protein Information
                </h3>
                <div className="bg-white rounded-[20px] p-4 space-y-3">
                  <div>
                    <span className="font-red-hat text-base font-bold text-kumi-black">
                      PDB ID:{" "}
                    </span>
                    <span className="font-red-hat text-base text-kumi-black">
                      {proteinData?.PDBID}
                    </span>
                  </div>
                  <hr className="border-dashed border-kumi-gray-200" />
                  <div>
                    <span className="font-red-hat text-base font-bold text-kumi-black">
                      UniProtKB ID:{" "}
                    </span>
                    <span className="font-red-hat text-base text-kumi-black">
                      {proteinData?.UniProtKBID}
                    </span>
                  </div>
                  <hr className="border-dashed border-kumi-gray-200" />
                  <div>
                    <span className="font-red-hat text-base font-bold text-kumi-black">
                      Function:
                    </span>
                    <span className="font-red-hat text-base text-kumi-black">
                      {proteinData?.function}
                    </span>
                  </div>
                </div>
              </div>
              {/* Protein Structure Visualization */}
              <div className="mt-6 bg-kumi-gray-100 rounded-3xl rounded-3xl p-4">
                <h3 className="font-red-hat text-xl font-bold text-kumi-black mb-4 ml-2 mt-3">
                  Beta-2 Adrenergic Receptor (P07550)
                </h3>
                <div
                  className="bg-white rounded-[20px] p-4 space-y-3"
                  onClick={() => {
                    navigate("/protein");
                  }}
                >
                  <span className="font-red-hat text-base font-bold text-kumi-black cursor-pointer">
                    Click here to see PDB Visualization
                  </span>
                </div>
              </div>
            </div>

            {/* Druggability and Known Modulators */}
            <div className="space-y-6">
              {/* Druggability */}
              <div className="bg-kumi-gray-100 rounded-3xl p-5 w-full">
                <div className="flex items-center justify-between mb-4 flex-col 2xl:flex-row">
                  <h3 className="font-red-hat text-md 2xl:text-lg font-bold text-kumi-black">
                    Druggability
                  </h3>
                  <div className="bg-kumi-orange text-white px-8 py-2 rounded-full">
                    <span className="font-red-hat text-md 2xl:text-lg">
                      score: {proteinData?.druggabilityScore}
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-[20px] p-4">
                  <h4 className="font-red-hat text-base font-bold text-kumi-black mb-3">
                    Key factors:
                  </h4>
                  <hr className="border-dashed border-kumi-gray-200 mb-3" />
                  <div className="space-y-3 text-sm">
                    {proteinData?.druggabilityFactor.map((factor, index) => (
                      <>
                        <p
                          key={`key-factor-${index}`}
                          className="font-red-hat text-base text-kumi-black"
                        >
                          {factor}
                        </p>
                        {index < proteinData.druggabilityFactor.length - 1 && (
                          <hr className="border-dashed border-kumi-gray-200" />
                        )}
                      </>
                    ))}
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
                  {proteinData?.modulator?.map((row, index) => (
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
  );
};

export default WorkflowVisualization;
