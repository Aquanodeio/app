import { SpheronSDK } from '@spheron/protocol-sdk';

export async function getDepLogs(leaseId: string) {
    try {
        
        const sdk = new SpheronSDK('testnet', process.env.NEXT_PUBLIC_SPHERON_PRIVATE_KEY!);
        const something = await sdk.deployment.getDeploymentLogs(leaseId!, process.env.NEXT_PUBLIC_SPHERON_PROXY!)
        // const stringifiedSomething = JSON.stringify(something);
        const logs = JSON.stringify(something);
        return logs;
    } catch (error) {
        console.error(error);
        return "No logs available";
    }
}