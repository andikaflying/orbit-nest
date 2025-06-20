import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectContextMenuProps {
  onRename?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

const ProjectContextMenu: React.FC<ProjectContextMenuProps> = ({
  onRename,
  onDuplicate,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: () => void | undefined) => {
    if (action) action();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-8 h-8 p-0 hover:bg-gray-100 rounded-lg"
      >
        <MoreVertical className="w-4 h-4 text-kumi-gray-400" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-lg border border-kumi-gray-100 z-20 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onRename);
              }}
              className="w-full px-6 py-3 text-left font-red-hat text-base font-semibold text-white bg-kumi-blue-400 hover:bg-kumi-blue-500 transition-colors"
            >
              Rename
            </button>

            <div className="h-px bg-kumi-gray-100" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onDuplicate);
              }}
              className="w-full px-6 py-3 text-left font-red-hat text-base font-semibold text-kumi-black hover:bg-gray-50 transition-colors"
            >
              Duplicate
            </button>

            <div className="h-px bg-kumi-gray-100" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onDelete);
              }}
              className="w-full px-6 py-3 text-left font-red-hat text-base font-semibold text-kumi-black hover:bg-gray-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectContextMenu;
