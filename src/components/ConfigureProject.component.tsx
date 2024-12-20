/* disable-eslint */
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth, useDebounce } from "@/hooks";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui";
import { Octokit } from "octokit";

export default function ConfigureProject() {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const repos: any = [];

  const filterRepos = repos.filter((repo: any) =>
    repo.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const fetchGitHubRepos = async () => {
    try {
      // Retrieve stored credentials from localStorage
      const storedCredentials = localStorage.getItem(
        "mowhq_refreshToken_cookie"
      );

      if (!storedCredentials) {
        console.error("No credentials found in localStorage.");
        return;
      }

      const credentials = JSON.parse(storedCredentials);
      const { accessToken } = credentials;

      if (!accessToken) {
        console.error("Access token not found in credentials.");
        return;
      }

      // Initialize Octokit with the access token
      const octokit = new Octokit({
        auth: accessToken,
      });

      // Fetch repositories
      const response = await octokit.request("GET /users/{username}/repos", {
        username: "13x54n", // Replace or make dynamic
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      console.log("User repositories:", response.data);
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  return (
    <div className="w-full p-6 pt-0">
      <h2 className="text-sm mb-2">Import from Git</h2>
      <div className="flex gap-2 mb-4">
        <div className="flex items-center gap-1 cursor-pointer border-[1.5px] rounded-xl py-0 px-2.5">
          <Avatar className="w-6 object-contain h-6">
            {authState?.user?.photoURL ? (
              <AvatarImage src={authState?.user?.photoURL} />
            ) : authState?.user?.user?.photoURL ? (
              <AvatarImage src={authState?.user?.user?.photoURL} />
            ) : (
              ""
            )}
            <AvatarFallback>
              <AvatarImage src="https://images.unsplash.com/photo-1644912325393-cb31907c98f0?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </AvatarFallback>
          </Avatar>
          <p className="text-sm">
            {authState?.user?.displayName
              ? authState.user?.displayName
              : authState?.user?.user?.displayName
              ? authState?.user?.user?.displayName
              : ""}
          </p>
        </div>
        <div className="relative flex-grow">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 border-[1.5px] border-gray-300 text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filterRepos.length > 0 &&
          filterRepos?.map((repo: any) => {
            const parsedDate: Date = new Date(repo.updated_at);
            const now: Date = new Date();
            const timeDifference: number = now.getTime() - parsedDate.getTime();
            const daysAgo: number = Math.floor(
              timeDifference / (1000 * 60 * 60 * 24)
            );

            const handleImportClick = () => {
              const repoSrcUrl = repo.html_url;
              const fullName = repo.full_name;
              const owner = repo.owner.login;
              const defaultBranch = repo.default_branch;
              const name = repo.name;
              navigate(
                `/new?s=${encodeURIComponent(
                  repoSrcUrl
                )}&name=${name}&fullname=${fullName}&owner=${owner}&default_branch=${defaultBranch}`
              );
            };
            return (
              <div
                key={repo.name}
                className="flex items-center justify-between p-2 rounded"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded">
                    {/* {repo?.owner?.avatar_url} */}
                  </span>
                  <span>{repo.name}</span>
                  <span className="text-xs text-gray-400">
                    {daysAgo} days ago
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleImportClick}
                >
                  Import
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
