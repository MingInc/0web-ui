import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectContext } from "@/contexts/ProjectContext/ProjectContext";
import {
  GitBranchIcon,
  GitCommitIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  RocketIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function DeployedProjects() {
  const { projectState } = useProjectContext();
  const navigate = useNavigate();

  // if (projectState.loading) {
  //   return (
  //     <div className="container mx-auto px-1">
  //       <h1 className="text-2xl font-bold mb-6">Deployed Projects</h1>
  //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  //         {[...Array(3)].map((_, index) => (
  //           <Card key={index} className="flex flex-col">
  //             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  //               <Skeleton className="h-6 w-2/3" />
  //               <Skeleton className="h-5 w-20" />
  //             </CardHeader>
  //             <CardContent>
  //               <Skeleton className="h-4 w-1/2 mb-2" />
  //               <Skeleton className="h-4 w-full mb-2" />
  //               <Skeleton className="h-4 w-3/4" />
  //             </CardContent>
  //             <CardFooter className="flex justify-between mt-auto">
  //               <Skeleton className="h-4 w-1/3" />
  //               <div className="flex space-x-2">
  //                 <Skeleton className="h-8 w-16" />
  //                 <Skeleton className="h-8 w-8" />
  //               </div>
  //             </CardFooter>
  //           </Card>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  // if (!projectState?.projects || projectState.projects.length === 0) {
  //   return (
  //     <div className="container mx-auto px-1 flex flex-col items-center justify-center min-h-[30vh]">
  //       <RocketIcon className="h-14 w-14 text-gray-400 mb-4" />
  //       <h1 className="text-xl font-bold mb-2">No projects are deployed yet</h1>
  //       <p className="text-muted-foreground mb-4 text-sm">
  //         Start by deploying your first project
  //       </p>
  //       <button
  //         className="text-sm font-semibold"
  //         >
  //       </button>
  //       <HoverBorderGradient
  //         onClick={() => navigate("/create-new")}
  //         containerClassName="rounded-lg"
  //         as="button"
  //         className="bg-black text-sm font-semibold text-white flex items-center space-x-2"
  //         >
  //         <span>Deploy Your First Project 🦄</span>
  //       </HoverBorderGradient>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-1">
      <h1 className="text-md font-medium mb-2">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border-2 flex flex-col p-1 px-4 cursor-pointer transition-all ease-in-out hover:border-[#bdc3c7]">
          <div className="flex flex-row items-center justify-between space-y-0">
            <h2 className="text-sm mt-1">Sample Project</h2>
          </div>
          <div className="mt-1">
            <div className="text-sm text-muted-foreground mb-1">
              Framework: Vite.js
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <GitBranchIcon className="mr-2 h-4 w-4" />
              <span className="truncate">MingHQ/sampleDapp</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1 mb-2">
              <GitCommitIcon className="mr-2 h-4 w-4" />
              <span>https://0web.minginc.xyz</span>
            </div>
          </div>
        </div>
        <div className="border-2 items-center justify-center flex flex-col p-1 px-4 text-sm cursor-pointer hover:border-[#bdc3c7] transition-all ease-in-out">
          <i className="ri-add-line"></i> Create new project
        </div>
        {/* {projectState.projects.map((project, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <h2 className="text-lg font-semibold">{project.projectName}</h2>
              <Badge
                variant={
                  project.projectDeploymentData.buildStatus === "completed"
                    ? "default"
                    : "destructive"
                }
              >
                {project.projectDeploymentData.buildStatus}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-1">
                Framework: {project.projectFramework}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <GitBranchIcon className="mr-2 h-4 w-4" />
                <span className="truncate">
                  {project.githubUrl.split("/").pop()}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <GitCommitIcon className="mr-2 h-4 w-4" />
                <span>{project.projectDeploymentData.buildUrl}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Build time: {project.projectDeploymentData.buildTime} seconds
              </div>
              <div className="flex space-x-2">
                {project.projectDeploymentData.buildUrl && (
                  <Button
                    onClick={() =>
                      window.open(
                        project.projectDeploymentData.buildUrl,
                        "_blank",
                        "rel=noopener noreferrer"
                      )
                    }
                    size="sm"
                    variant="outline"
                  >
                    <ExternalLinkIcon className="h-4 w-4 mr-2" />
                    Visit
                  </Button>
                )}
                <Button size="sm" variant="ghost">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))} */}
      </div>
    </div>
  );
}
