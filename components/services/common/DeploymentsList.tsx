import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Deployment } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { useRouter } from "next/navigation";
import { isDeploymentActive } from "@/lib/deployment";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy } from "lucide-react";

interface DeploymentsListProps {
  isLoading: boolean;
  error: string | null;
  deployments: Deployment[];
  onDelete?: (deploymentId: string) => void;
  serviceName?: string;
}

const DeploymentsList: React.FC<DeploymentsListProps> = ({
  isLoading,
  error,
  deployments,
  onDelete,
  serviceName,
}) => {
  const router = useRouter();
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  console.log("deployments", serviceName);

  const renderSkeletonDeployments = () => (
    <div className="grid gap-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="card-primary flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        >
          <div className="space-y-2 flex-grow">
            <Skeleton className="h-4 w-full max-w-[300px]" />
            <Skeleton className="h-4 w-full max-w-[250px]" />
            <Skeleton className="h-4 w-full max-w-[200px]" />
          </div>
          <div className="flex gap-2 self-end md:self-center">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return renderSkeletonDeployments();
  }

  if (error) {
    return <p className="body-base text-destructive">{error}</p>;
  }

  if (deployments.length === 0) {
    return (
      <div className="card-glass text-center py-16">
        <p className="heading-5 text-muted-foreground space-tight">
          No deployments found
        </p>
        <p className="body-small text-muted-foreground/70">
          Create a new instance to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 w-full">
      {deployments.map((deployment) => {
        const deploymentActive = isDeploymentActive(
          deployment.created_at,
          deployment.duration
        );

        const appUrl = deployment.app_url;

        let Url;
        if (appUrl) {
          Url = new URL(appUrl);
        }

        const port = Url?.port;
        const hostname = Url?.hostname;

        if (deploymentActive) {
          console.log("deploymentActive", deployment);
        }

        const sshCommand = `ssh -i <private-key> root@${hostname} -p ${port}`;

        return (
          <div
            key={deployment.id}
            className="card-primary flex flex-col md:flex-row md:items-center md:justify-between gap-3 w-full overflow-hidden"
          >
            <div className="space-y-2 flex-grow min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="body-small text-muted-foreground">ID:</span>
                <Link
                  href={`/deployments/${deployment.id}`}
                  className="body-small text-foreground hover:text-primary hover:underline font-medium truncate max-w-[180px] sm:max-w-[240px]"
                  title={deployment.id}
                >
                  {deployment.id}
                </Link>
                <span
                  className={`status-badge ${
                    deploymentActive ? "status-active" : "status-inactive"
                  }`}
                >
                  {deploymentActive ? "Active" : "Expired"}
                </span>
              </div>
              {deployment.app_url && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="body-small text-muted-foreground">URL:</span>
                  <a
                    href={deployment.app_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-small text-foreground hover:text-primary hover:underline truncate max-w-[180px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-md"
                    title={deployment.app_url}
                  >
                    {deployment.app_url}
                  </a>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <span className="body-small text-muted-foreground">
                  Created:
                </span>
                <span className="body-small text-muted-foreground/90">
                  {formatDistanceToNow(new Date(deployment.created_at))} ago
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="body-small text-muted-foreground">
                  Resources:
                </span>
                <span className="body-small text-muted-foreground/90 break-all sm:break-normal">
                  {deployment.cpu} CPU | {deployment.memory} RAM |{" "}
                  {deployment.storage} Storage
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 self-end md:self-center mt-2 md:mt-0">
              {deployment.app_url &&
                deploymentActive &&
                (serviceName === "VM" ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="btn-primary btn-sm w-full sm:w-auto"
                      >
                        SSH into VM
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>SSH into VM</DialogTitle>
                        <DialogDescription>
                          Copy the command below and run it in your terminal
                          with your private key
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label className="body-small text-muted-foreground">
                            SSH Command
                          </Label>
                          <div className="relative mt-2">
                            <Input
                              readOnly
                              value={sshCommand}
                              className="font-mono text-sm pr-20"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs"
                              onClick={async () => {
                                await navigator.clipboard.writeText(sshCommand);
                                setCopiedStates((prev) => ({
                                  ...prev,
                                  [deployment.id]: true,
                                }));
                                setTimeout(() => {
                                  setCopiedStates((prev) => ({
                                    ...prev,
                                    [deployment.id]: false,
                                  }));
                                }, 2000);
                              }}
                            >
                              {copiedStates[deployment.id] ? (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="card-glass p-3 space-y-2">
                          <p className="body-small font-medium">
                            Instructions:
                          </p>
                          <ol className="body-small text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>
                              Replace{" "}
                              <code className="bg-muted px-1 rounded text-xs">
                                private-key
                              </code>{" "}
                              with your private key file path
                            </li>
                            <li>
                              Ensure your private key has correct permissions:{" "}
                              <code className="bg-muted px-1 rounded text-xs">
                                chmod 600 your-key.pem
                              </code>
                            </li>
                            <li>Run the command in your terminal</li>
                          </ol>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button className="btn-secondary btn-sm">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : serviceName === "INFERENCE" ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="btn-primary btn-sm w-full sm:w-auto"
                      >
                        Connect to Model
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Model API Access</DialogTitle>
                        <DialogDescription>
                          Connect to your Ollama model using the API endpoint
                          below
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label className="body-small text-muted-foreground">
                            API Endpoint
                          </Label>
                          <div className="relative mt-2">
                            <Input
                              readOnly
                              value={deployment.app_url || ""}
                              className="font-mono text-sm pr-20"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs"
                              onClick={async () => {
                                await navigator.clipboard.writeText(
                                  deployment.app_url || ""
                                );
                                setCopiedStates((prev) => ({
                                  ...prev,
                                  [`${deployment.id}_url`]: true,
                                }));
                                setTimeout(() => {
                                  setCopiedStates((prev) => ({
                                    ...prev,
                                    [`${deployment.id}_url`]: false,
                                  }));
                                }, 2000);
                              }}
                            >
                              {copiedStates[`${deployment.id}_url`] ? (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="body-small text-muted-foreground">
                            cURL Example
                          </Label>
                          <div className="relative mt-2">
                            <Input
                              readOnly
                              value={`curl -X POST ${deployment.app_url}/api/chat -H "Content-Type: application/json" -d '{"model":"deepseek-r1","messages":[{"role":"user","content":"Hello world!"}]}'`}
                              className="font-mono text-xs pr-20"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs"
                              onClick={async () => {
                                const curlCommand = `curl -X POST ${deployment.app_url}/api/chat -H "Content-Type: application/json" -d '{"model":"deepseek-r1","messages":[{"role":"user","content":"Hello world!"}]}'`;
                                await navigator.clipboard.writeText(
                                  curlCommand
                                );
                                setCopiedStates((prev) => ({
                                  ...prev,
                                  [`${deployment.id}_curl`]: true,
                                }));
                                setTimeout(() => {
                                  setCopiedStates((prev) => ({
                                    ...prev,
                                    [`${deployment.id}_curl`]: false,
                                  }));
                                }, 2000);
                              }}
                            >
                              {copiedStates[`${deployment.id}_curl`] ? (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="card-glass p-4 space-y-3">
                          <p className="body-small font-medium text-foreground">
                            Usage Instructions:
                          </p>
                          <div className="space-y-3">
                            <div>
                              <p className="body-small font-medium text-muted-foreground mb-1">
                                1. API Integration
                              </p>
                              <p className="body-small text-muted-foreground/90">
                                Use the endpoint above to connect your
                                applications to the model
                              </p>
                            </div>
                            <div>
                              <p className="body-small font-medium text-muted-foreground mb-1">
                                2. API Documentation
                              </p>
                              <p className="body-small text-muted-foreground/90">
                                Check{" "}
                                <code className="bg-muted px-1 rounded text-xs">
                                  {deployment.app_url}/api/tags
                                </code>{" "}
                                for available models
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button className="btn-secondary btn-sm">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <a
                    href={deployment.app_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="sm"
                      className="btn-primary btn-sm w-full sm:w-auto"
                    >
                      Open App
                    </Button>
                  </a>
                ))}

              <Button
                variant="outline"
                size="sm"
                className="btn-secondary btn-sm w-full sm:w-auto"
                onClick={() => {
                  router.push(`/deployments/${deployment.id}`);
                }}
              >
                View
              </Button>
              {deploymentActive && (
                <Button
                  variant="outline"
                  size="sm"
                  className="btn-secondary btn-sm text-destructive hover:text-destructive w-full sm:w-auto"
                  onClick={() => onDelete && onDelete(deployment.id)}
                >
                  Stop
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeploymentsList;
