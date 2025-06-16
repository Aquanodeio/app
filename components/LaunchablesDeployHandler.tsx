import { useRouter } from "next/navigation";
import { ProviderType, ServiceType } from "@/lib/types";
import { useCreateDeployment } from "@/hooks/deployments/useCreateDeployment";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export interface User {
  id: string;
}

interface UseLaunchablesDeployProps {
  repository: string;
  model_docker_image?: string;
  user: User | null;
  isAuthLoading: boolean;
  config?: any;
}

export function useLaunchablesDeploy({
  repository,
  model_docker_image,
  user,
  isAuthLoading,
  config,
}: UseLaunchablesDeployProps) {
  const router = useRouter();
  const { mutate: createDeployment, isPending: isDeploying } =
    useCreateDeployment("/app/deployments");

  const [resolvedImage, setResolvedImage] = useState<string | undefined>();
  const [isImage, setIsImage] = useState<boolean>(false);

  useEffect(() => {
    if (!repository) throw new Error("Repository not found");
    handleResolveImage();
  }, [repository, model_docker_image]);

  const handleResolveImage = async () => {
    try {
      console.log("repository", repository);
      console.log("meow meow");
      const { resolvedImage, isImage } = await resolveImageAsync({
        repository,
        model_docker_image,
      });
      console.log("resolvedImage", resolvedImage);
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
      appPort: 22,
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
          router.push("/app/deployments");
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
  model_docker_image,
  repository,
}: {
  model_docker_image?: string;
  repository: string;
}): Promise<{
  resolvedImage?: string;
  isImage: boolean;
}> {
  try {
  const repo = repository.toLowerCase().trim();

  if (model_docker_image) {
    return {
      resolvedImage: model_docker_image,
      isImage: true,
    };
  }

  if (repo.includes("hub.docker.com")) {
    console.log("meow meow 2")
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
      try {
        const res = await fetch(
          `https://hub.docker.com/v2/repositories/${namespace}/${image}/tags?page_size=1`
        );
        const json = await res.json();
        const tag = json?.results?.[0]?.name || "latest";
        return {
          resolvedImage: `${namespace}/${image}:${tag}`,
          isImage: true,
        };
      } catch (err) {
        console.warn("DockerHub fetch failed", err);
      }
    }
  }

  if (repo.includes("huggingface.co")) {
    const slug = repo.replace("https://huggingface.co/", "").replace(/\/$/, "");
    try {
      const res = await fetch(`https://huggingface.co/api/models/${slug}`);
      if (!res.ok) throw new Error("Not found on Hugging Face");

      return {
        resolvedImage: `ghcr.io/huggingface/${slug}`,
        isImage: true,
      };
    } catch (err) {
      console.warn("Hugging Face model lookup failed", err);
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
