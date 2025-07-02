import { useRouter } from "next/navigation";
import { ProviderType } from "@/lib/types";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export interface User {
  id: string;
}

interface UseLaunchablesDeployProps {
  repository: string;
  user: User | null;
  isAuthLoading: boolean;
  config?: any;
  port?: number;
}

export function useLaunchablesDeploy({
  repository,
  user,
  isAuthLoading,
  config,
  port,
}: UseLaunchablesDeployProps) {
  const router = useRouter();
  const { mutate: createDeployment, isPending: isDeploying } =
    useCreateDeployment("/deployments");

  const [resolvedImage, setResolvedImage] = useState<string | undefined>();
  const [isImage, setIsImage] = useState<boolean>(false);

  useEffect(() => {
    if (!repository) throw new Error("Repository not found");
    handleResolveImage();
  }, [repository]);

  const handleResolveImage = async () => {
    try {
      const { resolvedImage, isImage } = await resolveImageAsync({
        repository,
      });
      setResolvedImage(resolvedImage);
      setIsImage(isImage);
    } catch (err) {
      console.error("Failed to resolve image:", err);
      toast.error("Error resolving image or repo.");
    }
  };

  const handleDeploy = async () => {
    if (!user?.id) {
      toast.error(
        "Authentication Required. Please sign in to deploy a launchable."
      );
      return;
    }

    if (!resolvedImage) {
      toast.error("Unable to resolve image or repository.");
      return;
    }

    const configArg = config ?? {
      ...(isImage ? { image: resolvedImage } : { repoUrl: resolvedImage }), // <-- 👈 core logic
      deploymentDuration: "1h",
      appPort: port || 3000,
      appCpuUnits: 1,
      appMemorySize: "2Gi",
      appStorageSize: "10Gi",
      allowAutoscale: false,
      disablePull: false,
    };

    createDeployment(
      {
        service: "BACKEND",
        tier: "CUSTOM",
        provider: ProviderType.SPHERON,
        config: configArg,
      },
      {
        onError: (error) => {
          console.error("Error deploying template:", error);
          toast.error("Failed to deploy template. Please try again.");
        },
        onSuccess: () => {
          toast.success("Deployed successfully!");
          router.push("/deployments");
        },
      }
    );
  };

  return {
    isDeploying,
    handleDeploy,
    isButtonDisabled:
      isAuthLoading ||
      !user?.id ||
      isDeploying ||
      !repository ||
      !resolvedImage,
  };
}

export async function resolveImageAsync({
  repository,
}: {
  repository: string;
}): Promise<{
  resolvedImage?: string;
  isImage: boolean;
}> {
  try {
    const repo = repository.toLowerCase().trim();

    if (repo.includes("hub.docker.com")) {
      let namespace: string | undefined;
      let image: string | undefined;

      // Match /r/{namespace}/{image}
      const matchR = repo.match(/hub\.docker\.com\/r\/([^/]+)\/([^/]+)/);
      if (matchR) {
        [, namespace, image] = matchR;
      }

      // Match /_/image (official image with implicit 'library' namespace)
      const matchOfficial = repo.match(/hub\.docker\.com\/_\/([^/]+)/);
      if (matchOfficial) {
        namespace = "library";
        image = matchOfficial[1];
      }

      if (namespace && image) {
        return {
          resolvedImage: `${namespace}/${image}`,
          isImage: true,
        };
      }
    }

    if (repo.includes("github.com")) {
      return {
        resolvedImage: repository,
        isImage: false,
      };
    }
    throw new Error("Something went wrong");
  } catch (err) {
    throw new Error("Error resolving image or repo.", { cause: err });
  }
}
