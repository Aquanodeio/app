"use client";

import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import {
  GitBranch,
  Github,
  RefreshCw,
  Check,
  ChevronDown,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Text, Card } from "@/components/ui/design-system";
import { toast } from "sonner";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabase/client";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  clone_url: string;
  default_branch: string;
  description?: string;
  updated_at: string;
}

interface GitHubBranch {
  name: string;
  commit: {
    sha: string;
  };
  protected?: boolean;
}

interface GitHubStatus {
  connected: boolean;
  username?: string;
}

interface GitHubProviderSectionProps {
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  branchName: string;
  setBranchName: (name: string) => void;
}

export function GitHubProviderSection({
  repoUrl,
  setRepoUrl,
  branchName,
  setBranchName,
}: GitHubProviderSectionProps) {
  const [githubStatus, setGithubStatus] = useState<GitHubStatus>({
    connected: false,
  });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [branches, setBranches] = useState<GitHubBranch[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [isLoadingBranches, setIsLoadingBranches] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRepoPickerOpen, setIsRepoPickerOpen] = useState(false);
  const [isBranchPickerOpen, setIsBranchPickerOpen] = useState(false);

  const repoPickerRef = useRef<HTMLDivElement>(null);
  const branchPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkGitHubStatus();
  }, []);

  const checkGitHubStatus = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.provider_token && session?.user?.user_metadata?.user_name) {
        setGithubStatus({
          connected: true,
          username: session.user.user_metadata.user_name,
        });
        if (session.provider_token) {
          loadRepos(session.provider_token);
        }
      } else {
        setGithubStatus({ connected: false });
      }
    } catch (error) {
      console.error("Error checking GitHub status:", error);
      setGithubStatus({ connected: false });
    }
  };

  const connectGitHub = async () => {
    try {
      setIsConnecting(true);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          scopes: "repo user:email",
          redirectTo: `${window.location.origin}/app/services?github=connected`,
        },
      });

      if (error) {
        toast.error("Failed to connect GitHub");
        console.error("GitHub OAuth error:", error);
      }
    } catch (error) {
      console.error("Error connecting GitHub:", error);
      toast.error("Failed to connect GitHub");
    } finally {
      setIsConnecting(false);
    }
  };

  const loadRepos = async (token: string) => {
    try {
      setIsLoadingRepos(true);

      const response = await fetch("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const repoData = await response.json();
        setRepos(repoData);
      } else if (response.status === 401) {
        toast.error("GitHub token expired. Please reconnect.");
        setGithubStatus({ connected: false });
      } else {
        toast.error("Failed to load repositories");
      }
    } catch (error) {
      console.error("Error loading repos:", error);
      toast.error("Failed to load repositories");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const loadBranches = async (repo: GitHubRepo) => {
    try {
      setIsLoadingBranches(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.provider_token) {
        toast.error("No GitHub token found");
        return;
      }

      const [owner, repoName] = repo.full_name.split("/");
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/branches`,
        {
          headers: {
            Authorization: `Bearer ${session.provider_token}`,
          },
        }
      );

      if (response.ok) {
        const branchData = await response.json();
        setBranches(branchData);
      } else {
        toast.error("Failed to load branches");
      }
    } catch (error) {
      console.error("Error loading branches:", error);
      toast.error("Failed to load branches");
    } finally {
      setIsLoadingBranches(false);
    }
  };

  const handleRepoSelect = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setRepoUrl(repo.clone_url);
    setBranchName(repo.default_branch);
    setBranches([]);
    setIsRepoPickerOpen(false);
    loadBranches(repo);
  };

  const handleBranchSelect = (branchName: string) => {
    setBranchName(branchName);
    setIsBranchPickerOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Handle redirect from GitHub OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("github") === "connected") {
      toast.success("GitHub connected successfully!");
      checkGitHubStatus();
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("github") === "error") {
      toast.error("Failed to connect GitHub");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  if (!githubStatus.connected) {
    return (
      <Card variant="compact" className="text-center py-12">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
            <Github className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Text variant="base" className="font-medium">
              Connect your GitHub account
            </Text>
            <Text variant="small" muted>
              Access your repositories to deploy your projects
            </Text>
          </div>
          <Button
            onClick={connectGitHub}
            disabled={isConnecting}
            className="btn-primary btn-md"
          >
            {isConnecting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Github className="h-4 w-4 mr-2" />
                Connect GitHub
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connected Status */}
      <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Github className="h-4 w-4 text-primary" />
          </div>
          <div>
            <Text variant="base" className="font-medium">
              GitHub Connected
            </Text>
            <Text variant="small" muted>
              @{githubStatus.username}
            </Text>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            const {
              data: { session },
            } = await supabase.auth.getSession();
            if (session?.provider_token) {
              loadRepos(session.provider_token);
            }
          }}
          disabled={isLoadingRepos}
        >
          <RefreshCw
            className={`h-4 w-4 ${isLoadingRepos ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      {/* Repository Selection */}
      <div className="space-y-4">
        <div className="relative overflow-visible" ref={repoPickerRef}>
          <Label className="text-sm font-medium space-tight block">
            Repository
          </Label>
        </div>

        <Popover open={isRepoPickerOpen} onOpenChange={setIsRepoPickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between bg-secondary/10 border border-border/30 hover:bg-secondary/20 h-12"
              disabled={isLoadingRepos}
            >
              {selectedRepo ? (
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-2">
                      {selectedRepo.full_name}
                      {selectedRepo.private && (
                        <Lock className="h-3 w-3 text-amber-600" />
                      )}
                    </div>
                    {selectedRepo.description && (
                      <div className="text-xs text-muted-foreground truncate max-w-xs">
                        {selectedRepo.description}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  {isLoadingRepos
                    ? "Loading repositories..."
                    : "Select repositories..."}
                </div>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[1000px] p-0">
            <Command>
              <CommandInput
                placeholder="Search repositories..."
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No repositories found.</CommandEmpty>
                <CommandGroup>
                  {repos.map((repo) => (
                    <CommandItem
                      key={repo.id}
                      className="my-2"
                      onSelect={() => {
                        handleRepoSelect(repo);
                        setIsRepoPickerOpen(false);
                      }}
                    >
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <span>{repo.full_name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Branch Selection */}
        {selectedRepo && (
          <div className="relative overflow-visible" ref={branchPickerRef}>
            <Label className="text-sm font-medium space-tight block">
              Branch
            </Label>

            <Popover
              open={isBranchPickerOpen}
              onOpenChange={setIsBranchPickerOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between bg-secondary/10 border border-border/30 hover:bg-secondary/20 h-12"
                  disabled={isLoadingBranches || branches.length === 0}
                >
                  {branchName ? (
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{branchName}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">
                      {isLoadingBranches
                        ? "Loading branches..."
                        : "Select branch"}
                    </span>
                  )}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[1000px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search repositories..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No repositories found.</CommandEmpty>
                    <CommandGroup>
                      {branches?.map((branch) => (
                        <CommandItem
                          key={branch.name}
                          className="my-2"
                          onSelect={() => {
                            handleBranchSelect(branch.name);
                            setIsBranchPickerOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <GitBranch className="h-3 w-3 text-muted-foreground" />
                            <span>{branch.name}</span>
                            {branch.protected && (
                              <span className="px-1.5 py-0.5 text-xs bg-amber-100 text-amber-800 rounded">
                                Protected
                              </span>
                            )}
                          </div>
                          {branchName === branch.name && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHubProviderSection;
