import { SpheronSDK } from "@spheron/protocol-sdk";

export async function getSpheronDeploymentLogs(leaseId: string) {
  try {

    const sdk = new SpheronSDK({
      networkType: "mainnet",
      privateKey: process.env.NEXT_PUBLIC_SPHERON_PRIVATE_KEY!,
      rpcUrls: {
          http: `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
          websocket: `wss://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      },
    });

    const logs = await sdk.deployment.getDeploymentLogs(
      leaseId!,
      process.env.NEXT_PUBLIC_SPHERON_PROXY!
    );

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
    const logs = "logs";
    return logs;
  } catch (error) {
    console.error(error);
    return "No logs available";
  }
}
