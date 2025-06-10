"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GitBranch,
  Github,
  Dock,
  KeyRound,
  User,
  Tag,
  Globe,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import GitHubProviderSection from "./GitHubProviderSection";

export type SourceType = "github" | "docker";

interface SourceControlSectionProps {
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  branchName: string;
  setBranchName: (name: string) => void;
  dockerImage?: string;
  setDockerImage?: (image: string) => void;
  dockerTag?: string;
  setDockerTag?: (tag: string) => void;
  dockerUsername?: string;
  setDockerUsername?: (username: string) => void;
  dockerPassword?: string;
  setDockerPassword?: (password: string) => void;
  privateRegistry?: boolean;
  setPrivateRegistry?: (isPrivate: boolean) => void;
  sourceType: SourceType;
  setSourceType: (type: SourceType) => void;
}

export function SourceControlSection({
  repoUrl,
  setRepoUrl,
  branchName,
  setBranchName,
  dockerImage = "",
  setDockerImage = () => {},
  dockerTag = "latest",
  setDockerTag = () => {},
  dockerUsername = "",
  setDockerUsername = () => {},
  dockerPassword = "",
  setDockerPassword = () => {},
  privateRegistry = false,
  setPrivateRegistry = () => {},
  sourceType,
  setSourceType,
}: SourceControlSectionProps) {
  return (
    <div className="dashboard-card mb-8">
      <h3 className="text-lg font-medium mb-4">Source Control</h3>

      <div className="mb-6">
        <Tabs
          defaultValue={sourceType}
          onValueChange={(value) => setSourceType(value as SourceType)}
        >
          {/* <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>GitHub Repository</span>
            </TabsTrigger>
            <TabsTrigger value="docker" className="flex items-center gap-2">
              <Dock className="h-4 w-4" />
              <span>Docker Image</span>
            </TabsTrigger>
          </TabsList> */}

          <TabsList className="grid w-full grid-cols-3 space-element">
            <TabsTrigger value="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Git Provider
            </TabsTrigger>
            <TabsTrigger value="public" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Public Git Repository
            </TabsTrigger>
            <TabsTrigger value="docker" className="flex items-center gap-2">
              <Dock className="h-4 w-4" />
              Docker Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="github" className="space-y-6 mt-6">
            <GitHubProviderSection
              repoUrl={repoUrl}
              setRepoUrl={setRepoUrl}
              branchName={branchName}
              setBranchName={setBranchName}
            />
          </TabsContent>

          <TabsContent value="public" className="space-y-6">
            <div>
              <Label
                htmlFor="repo-url"
                className="text-sm text-muted-foreground mb-1 block"
              >
                Repository URL
              </Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="repo-url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="bg-secondary/10 border-border/30 focus:border-primary/50 pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                URL to your Git repository (GitHub, GitLab, Bitbucket, etc.)
              </p>
            </div>

            <div>
              <Label
                htmlFor="branch"
                className="text-sm text-muted-foreground mb-1 block"
              >
                Branch
              </Label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="branch"
                  placeholder="main"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="bg-secondary/10 border-border/30 focus:border-primary/50 pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                The branch to deploy from
              </p>
            </div>
          </TabsContent>

          <TabsContent value="docker" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <Label
                  htmlFor="docker-image"
                  className="text-sm text-muted-foreground mb-1 block"
                >
                  Docker Image
                </Label>
                <div className="relative">
                  <Dock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="docker-image"
                    placeholder="nginx"
                    value={dockerImage}
                    onChange={(e) => setDockerImage(e.target.value)}
                    className="bg-secondary/10 border-border/30 focus:border-primary/50 pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Name of the Docker image to deploy
                </p>
              </div>

              <div>
                <Label
                  htmlFor="docker-tag"
                  className="text-sm text-muted-foreground mb-1 block"
                >
                  Tag
                </Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="docker-tag"
                    placeholder="latest"
                    value={dockerTag}
                    onChange={(e) => setDockerTag(e.target.value)}
                    className="bg-secondary/10 border-border/30 focus:border-primary/50 pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tag of the Docker image (default: latest)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-2 mb-4">
              <Checkbox
                id="private-registry"
                checked={privateRegistry}
                onCheckedChange={(checked: boolean) =>
                  setPrivateRegistry(checked)
                }
              />
              <Label
                htmlFor="private-registry"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Private Registry
              </Label>
            </div>

            {privateRegistry && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pl-6 border-l-2 border-border/30">
                <div>
                  <Label
                    htmlFor="docker-username"
                    className="text-sm text-muted-foreground mb-1 block"
                  >
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="docker-username"
                      placeholder="username"
                      value={dockerUsername}
                      onChange={(e) => setDockerUsername(e.target.value)}
                      className="bg-secondary/10 border-border/30 focus:border-primary/50 pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Username for the private Docker registry
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="docker-password"
                    className="text-sm text-muted-foreground mb-1 block"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="docker-password"
                      type="password"
                      placeholder="••••••••"
                      value={dockerPassword}
                      onChange={(e) => setDockerPassword(e.target.value)}
                      className="bg-secondary/10 border-border/30 focus:border-primary/50 pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Password or access token for the private Docker registry
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SourceControlSection;
