import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Send,
  HelpCircle,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";
import SendArrowIcon from "../assets/send_arrow.svg";

const AIAssistant: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sampleQueries = [
    "Which molecular feature most correlates with the binders to the protein Caspase-7 with lower fup?",
    "Find the best-ranked molecules for protein Caspase-7 via virtual screening",
    "How accurate is the QSPR model in predicting binding?",
    "Give the molecules keep molecular weight (MW) remains below 500 while maintaining lower fup",
    "Which molecular features correlate most with permeability for Caspase-7?",
  ];

  return (
    <div
      className={`
           relative hidden sm:flex top-0 right-0 m-3 rounded-3xl bg-white border-l border-kumi-gray-100 transition-all duration-300 z-40
          ${isExpanded ? "w-full max-w-[460px]" : "w-[72px] overflow-hidden"}
        `}
    >
      {!isExpanded && (
        <div className="flex flex-col mx-auto">
          <Button
            variant="ghost"
            className="w-12 h-12 bg-kumi-gray-50 rounded-2xl mt-3"
            onClick={() => setIsExpanded(true)}
          >
            <ChevronLeft className="w-4 h-4 text-kumi-black" />
          </Button>
          <h2
            className="font-poppins mx-auto mt-6 text-xl font-semibold text-kumi-black"
            style={{ writingMode: "sideways-lr", textOrientation: "mixed" }}
          >
            KumiChem
            <sup className="font-konkhmer text-xs text-kumi-black mt-2 left-[-6px]">
              TM
            </sup>{" "}
            AI assistant
          </h2>
        </div>
      )}
      {isExpanded && (
        <div className="p-2 h-full flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              className="w-12 h-12 bg-kumi-gray-50 rounded-2xl"
              onClick={() => setIsExpanded(false)}
            >
              <ChevronRight className="w-4 h-4 text-kumi-black" />
            </Button>
            <div className="flex flex-row">
              <h2 className="font-poppins text-sm lg:text-xl font-semibold text-kumi-black">
                KumiChem
                <sup className="font-konkhmer text-xs text-kumi-black ml-0.5">
                  TM
                </sup>{" "}
                AI assistant
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="w-12 h-12 bg-kumi-gray-50 rounded-2xl"
              >
                <HelpCircle className="w-6 h-6 text-kumi-gray-300" />
              </Button>
              <Button
                variant="ghost"
                className="w-12 h-12 bg-kumi-gray-50 rounded-2xl"
              >
                <FileText className="w-6 h-6 text-kumi-black" />
              </Button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 relative bg-kumi-gray-50 rounded-[20px] p-3 mb-4 flex flex-col">
            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="mt-[200px]">
                <p className="text-kumi-gray-300 font-red-hat text-xs lg:text-base mb-2">
                  There are no messages yet.
                </p>
                <p className="text-kumi-gray-300 font-red-hat text-xs lg:text-base mb-8 max-w-[387px]">
                  To start the interaction, you can write your question or use
                  ready-made ones
                </p>
              </div>

              {/* Sample Queries */}
              <div className="w-full absolute bottom-0 p-3">
                <p className="text-kumi-black font-red-hat text-xs lg:text-base font-medium mb-4">
                  Explore our sample queries!
                </p>
                <div className="space-y-2">
                  {sampleQueries.map((query, index) => (
                    <button
                      key={index}
                      className="w-full p-1 lg:p-3 text-left bg-white border border-kumi-blue-100 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-kumi-black font-red-hat text-xs lg:text-sm">
                        {query}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 bg-kumi-gray-50 rounded-2xl p-3">
            <input
              type="text"
              placeholder="Describe your task here..."
              className="flex-1 bg-transparent text-kumi-gray-300 font-red-hat text-xs lg:text-base placeholder:text-kumi-gray-300 outline-none"
            />
            <Button className="w-6 h-6 bg-transparent hover:bg-kumi-blue-500 rounded p-0">
              <img src={SendArrowIcon} alt="Send" className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
