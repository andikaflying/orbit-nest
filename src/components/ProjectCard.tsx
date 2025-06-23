import React, { useState } from "react";
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
  blue: "bg-kumi-orange text-white",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  lastEdited,
  tags,
  isActive = false,
}) => {
  const navigate = useNavigate();
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  const handleClickProjectMenu = () => {
    setShowProjectMenu(!showProjectMenu);
  };

  return (
    <div
      className={`
        relative w-full flex flex-col rounded-[20px] border-[1.5px] bg-white cursor-pointer
        transition-all duration-200 hover:shadow-lg hover:border-kumi-blue-400
        ${isActive ? "border-kumi-gray-500" : "border-kumi-gray-100"}
      `}
    >
      {/* Thumbnail Section */}
      <div
        className="relative h-[170px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-[20px]"
        onClick={() => {
          navigate("/workflow");
        }}
      >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Bookmark
            className="w-6 h-6 text-kumi-gray-400 fill-none"
            strokeWidth={1.5}
          />
        </div>
      </div>
      {/* Content Section */}
      <div
        className="p-4 pb-4 flex justify-between items-start"
        onClick={handleClickProjectMenu}
      >
        <div className="flex flex-col gap-2">
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

          <h3 className="font-konkhmer text-xs lg:text-base text-kumi-black">
            {title}
          </h3>

          <p className="font-red-hat text-xs lg:text-sm text-kumi-gray-400">
            {lastEdited}
          </p>
        </div>
      </div>
      {showProjectMenu && (
        <ProjectContextMenu
          onRename={() => setShowProjectMenu(false)}
          onDuplicate={() => setShowProjectMenu(false)}
          onDelete={() => setShowProjectMenu(false)}
          isOpen={showProjectMenu}
        />
      )}
    </div>
  );
};

export default ProjectCard;
