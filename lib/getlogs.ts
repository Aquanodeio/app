import { SpheronSDK } from "@spheron/protocol-sdk";

export async function getSpheronDeploymentLogs(leaseId: string) {
  try {
    console.log("leaseId", leaseId);

    const sdk = new SpheronSDK(
      "testnet",
      process.env.NEXT_PUBLIC_SPHERON_PRIVATE_KEY!
    );
    const logs = await sdk.deployment.getDeploymentLogs(
      leaseId!,
      process.env.NEXT_PUBLIC_SPHERON_PROXY!
    );
    console.log("logs", logs);

    if (Array.isArray(logs)) {
      const formattedLogs = logs
        .map((logString) => {
          try {
            const logObj = JSON.parse(logString);
            const name = logObj.name || "";
            const message = logObj.message || "";
            return `[${name}] ${message}`;
          } catch (e) {
            return logString;
          }
        })
        .join("\n");

      return formattedLogs;
    }

    return JSON.stringify(logs);
  } catch (error) {
    console.error(error);
    return "No logs available";
  }
}

export async function getAkashDeploymentLogs(leaseId: string) {
  try {
    console.log("leaseId", leaseId);
    const logs = "logs";
    return logs;
  } catch (error) {
    console.error(error);
    return "No logs available";
  }
}
