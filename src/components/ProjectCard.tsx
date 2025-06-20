import React from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectContextMenu from "./ProjectContextMenu";

interface ProjectCardProps {
  title: string;
  lastEdited: string;
  tags: Array<{
    name: string;
    color: "yellow" | "green" | "orange";
  }>;
  isActive?: boolean;
  thumbnailUrl?: string;
}

const tagColorClasses = {
  yellow: "bg-kumi-yellow text-white",
  green: "bg-kumi-green text-white",
  orange: "bg-kumi-orange text-white",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  lastEdited,
  tags,
  isActive = false,
  thumbnailUrl,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/workflow");
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-[332px] flex flex-col rounded-[20px] border-[1.5px] overflow-hidden bg-white cursor-pointer
        transition-all duration-200 hover:shadow-lg hover:border-kumi-blue-400
        ${isActive ? "border-kumi-gray-500" : "border-kumi-gray-100"}
      `}
    >
      {/* Thumbnail Section */}
      <div className="relative h-[170px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-[20px]">
        {/* Workflow diagram placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-kumi-blue-400 rounded-xl opacity-20"></div>
        </div>

        {/* Header Icons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="w-6 h-8 bg-white rounded-sm flex items-start justify-center pt-1">
            <Bookmark
              className="w-4 h-4 text-kumi-gray-400 fill-none"
              strokeWidth={1.5}
            />
          </div>
          <div className="bg-white rounded-lg p-1">
            <ProjectContextMenu
              onRename={() => console.log("Rename project")}
              onDuplicate={() => console.log("Duplicate project")}
              onDelete={() => console.log("Delete project")}
            />
          </div>
        </div>

        {/* Sample workflow elements */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-6 bg-kumi-blue-400 rounded opacity-60"></div>
            <div className="w-12 h-1 bg-kumi-gray-400 opacity-40"></div>
            <div className="w-8 h-6 bg-kumi-gray-400 rounded opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 pb-4 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`
                  px-4 py-1 rounded-full text-xs font-medium font-red-hat
                  ${tagColorClasses[tag.color]}
                `}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-konkhmer text-base text-kumi-black">{title}</h3>

          {/* Last edited */}
          <p className="font-red-hat text-sm text-kumi-gray-400">
            {lastEdited}
          </p>
        </div>

        {/* User Avatar */}
        <div className="w-8 h-8 bg-kumi-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">Y</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
