import { z } from "zod";

export const CreateDeploymentSchema = z.object({
  service: z.enum(["JUPYTER", "BACKEND", "VMS"]),
  tier: z.enum(["DEFAULT", "CUSTOM"]),
  provider: z.enum(["spheron", "akash", "auto"]),
  config: z
    .object({
      appCpuUnits: z.number().optional(),
      appMemorySize: z.string().optional(),
      appPort: z.number().optional(),
      appStorageSize: z.string().optional(),
      deploymentDuration: z.string().optional(),
      image: z.string().optional(),
      repoUrl: z.string().optional(),
      branchName: z.string().optional(),
      envVars: z.record(z.string()).optional(),
      runCommands: z.string().optional(),
      allowAutoscale: z.boolean(),
      disablePull: z.boolean(),
    })
    .optional(),
});

export type CreateDeploymentSchemaType = z.infer<typeof CreateDeploymentSchema>;
