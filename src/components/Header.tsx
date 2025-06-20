import React from "react";
import { Search, HelpCircle, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white px-6 py-3 flex justify-between items-center gap-4 border-b border-kumi-gray-100">
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0">
        <div className="flex flex-row">
          <h1 className="font-konkhmer text-[34px] leading-none text-kumi-black font-semibold">
            KumiChem
          </h1>
          <span className="font-konkhmer text-[19px] leading-none text-kumi-black -mt-1 font-semibold">
            TM
          </span>
        </div>
      </div>

      {/* Navigation and Search (Center) */}
      <div className="flex-1 hidden lg:flex justify-center min-w-0 px-4">
        <div className="flex items-center gap-4 bg-kumi-gray-100 rounded-[20px] px-4 py-2 w-full max-w-5xl">
          <nav className="flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className={`
                ${
                  isActive("/") || isActive("/projects")
                    ? "bg-white text-kumi-black"
                    : "text-kumi-black hover:bg-white"
                }
                font-red-hat text-base font-medium px-10 py-3.5 h-12 rounded-xl
              `}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className="text-kumi-black font-red-hat text-base font-medium px-10 py-2 h-12 rounded-xl hover:bg-white"
            >
              Templates
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/workflow")}
              className={`
                ${
                  isActive("/workflow")
                    ? "bg-white text-kumi-black"
                    : "text-kumi-black hover:bg-white"
                }
                font-red-hat text-base font-medium px-10 py-2 h-12 rounded-xl
              `}
            >
              Workflow community
            </Button>
            <Button
              variant="ghost"
              className="text-kumi-black font-red-hat text-base font-medium px-10 py-2 h-12 rounded-xl hover:bg-white"
            >
              About us
            </Button>
          </nav>

          <Input
            type="text"
            placeholder="Search information"
            className="text-kumi-gray-300 font-red-hat text-base border-none"
            startAdornment={
              <Search className="w-4 h-4 text-kumi-gray-300 my-auto" />
            }
            containerClassName="bg-white rounded-xl flex-grow"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="lg:hidden bg-kumi-gray-100 rounded-[20px] p-2">
          <div className="bg-white rounded-xl p-3">
            <Search className="w-6 h-6 text-kumi-gray-300" />
          </div>
        </div>

        <div className="bg-kumi-gray-100 rounded-[20px] p-2">
          <div className="bg-white rounded-xl p-3">
            <HelpCircle className="w-6 h-6 text-kumi-black" />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-kumi-gray-100 rounded-[20px] px-2 py-2">
          <div className="w-12 h-12 bg-kumi-blue-400 rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-kumi-blue-400 rounded-lg flex items-center justify-center text-white font-bold">
              Y
            </div>
          </div>
          <span className="font-vela text-base font-medium text-kumi-black hidden xl:inline">
            Yamamoto
          </span>
          <div className="bg-white rounded-xl p-3">
            <ChevronDown className="w-4 h-4 text-kumi-black" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
