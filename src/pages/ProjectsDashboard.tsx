import React from "react";
import { Plus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import ProjectCard from "../components/ProjectCard";

const ProjectsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const mockProjects = [
    {
      title: "My projects",
      lastEdited: "Edited 2 minutes ago",
      tags: [{ name: "Data preparation", color: "yellow" as const }],
      isActive: true,
    },
    {
      title: "My projects",
      lastEdited: "Edited 2 minutes ago",
      tags: [{ name: "Data", color: "green" as const }],
    },
    {
      title: "My projects",
      lastEdited: "Edited 2 minutes ago",
      tags: [
        { name: "Preprocessing", color: "orange" as const },
        { name: "Data", color: "green" as const },
      ],
    },
    {
      title: "My projects",
      lastEdited: "Edited 2 minutes ago",
      tags: [
        { name: "Preprocessing", color: "orange" as const },
        { name: "Data", color: "green" as const },
        { name: "Data preparation", color: "yellow" as const },
      ],
    },
    {
      title: "My projects",
      lastEdited: "Edited 2 minutes ago",
      tags: [{ name: "Data preparation", color: "yellow" as const }],
    },
    {
      title: "My projects",
      lastEdited: "Edited 2 minutes ago",
      tags: [{ name: "Data", color: "green" as const }],
    },
    {
      title: "My projects",
      lastEdited: "Edited 2 minutes ago",
      tags: [
        { name: "Preprocessing", color: "orange" as const },
        { name: "Data", color: "green" as const },
      ],
    },
  ];

  return (
    <div className="max-w-[1424px] bg-white rounded-3xl m-3 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Left Navigation */}
        <div className="flex items-center gap-2">
          <div className="bg-kumi-gray-100 rounded-2xl p-1.5">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                className="bg-white text-kumi-black font-red-hat text-sm font-medium px-10 py-2 h-9 rounded-xl"
              >
                Works
              </Button>
              <Button
                variant="ghost"
                className="text-kumi-black font-red-hat text-sm font-medium px-10 py-2 h-9 rounded-xl hover:bg-white"
              >
                Favorite
              </Button>
            </div>
          </div>

          {/* Create New Project Button */}
          <Button
            onClick={() => navigate("/workflow")}
            className="bg-kumi-blue-400 hover:bg-kumi-blue-500 text-white font-red-hat text-sm font-semibold px-8 py-4 h-12 rounded-2xl flex items-center gap-3"
          >
            Create a new project
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Sort By */}
          <div className="bg-kumi-gray-100 rounded-2xl px-5 py-1.5">
            <div className="flex items-center gap-3">
              <span className="text-kumi-black font-red-hat text-sm font-medium">
                Sort by:
              </span>
              <div className="bg-white rounded-xl px-6 py-2 flex items-center gap-2">
                <span className="text-kumi-black font-red-hat text-sm">
                  Last updated
                </span>
                <ChevronDown className="w-4 h-4 text-kumi-black" />
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="bg-kumi-gray-100 rounded-2xl px-5 py-1.5">
            <div className="flex items-center gap-3">
              <span className="text-kumi-black font-red-hat text-sm font-medium">
                Tags:
              </span>
              <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="text-kumi-gray-300 font-red-hat text-sm">
                  Unselected
                </span>
                <ChevronDown className="w-4 h-4 text-kumi-black" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8 flex items-center gap-3">
        <h2 className="font-konkhmer text-xl text-kumi-black">
          EZSAI (Easy Start AI):
        </h2>
        <p className="font-red-hat text-xl text-kumi-black">
          AI agent assisted workflows tailored for artificial intelligence for
          science (AI4S) drug discovery studies
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center">
        {mockProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            lastEdited={project.lastEdited}
            tags={project.tags}
            isActive={project.isActive}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsDashboard;
