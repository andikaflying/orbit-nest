import React, { useEffect, useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import ProjectCard from "../components/ProjectCard";
import { UserHistoryItem } from "@/types/UserHistoryWorkflowResponse";
import { ProjectItem } from "@/types/ProjectItem";

const ProjectsDashboard: React.FC = () => {
  const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);
  const navigate = useNavigate();
  const [userProjects, setUserProjects] = useState<ProjectItem[]>([]);

  const fetchProjectData = async () => {
    fetch("/assets/get_user_history_workflow_result1.json")
      .then((res) => res.json())
      .then((data) => {
        const item: UserHistoryItem[] = data.body?.item;
        console.log("Protein Data fetched: ", data);
        setUserHistory(item);
      })
      .catch((err) => {
        console.error("Failed to fetch project info:", err);
      });
  };

  useEffect(() => {
    if (userHistory.length > 0) {
      console.log("User History:", userHistory);
      const projects: ProjectItem[] = userHistory.map((item) => ({
        title: item.display_workflow_name,
        lastEdited: new Date(item.lastUpdated).toLocaleString(),
        tags: item.module_tag.map((tag) => ({
          name: tag,
          color: "yellow",
        })),
        isActive: item.like,
      }));

      setUserProjects(projects);
    }
  }, [userHistory]);

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <div className="max-w-[1424px] min-h-[600px] w-full h-full bg-white rounded-3xl m-3 p-3">
      <div className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
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

          <Button
            onClick={() => navigate("/workflow")}
            className="bg-kumi-blue-400 hover:bg-kumi-blue-500 w-auto lg:w-[378px] text-white font-red-hat text-sm font-semibold px-8 py-4 h-12 rounded-2xl flex items-center gap-3"
          >
            Create a new project
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="hidden 2xl:flex items-center gap-2">
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

      <div className="pt-6 pb-3">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
          <h2 className="font-konkhmer text-sm lg:text-xl text-kumi-black font-semibold">
            EZSAI (Easy Start AI):
          </h2>
          <p className="font-red-hat text-sm lg:text-xl text-kumi-black">
            AI agent assisted workflows tailored for artificial intelligence for
            science (AI4S) drug discovery studies
          </p>
        </div>
      </div>

      {userProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center">
          {userProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              lastEdited={project.lastEdited}
              tags={project.tags}
              isActive={project.isActive}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;
