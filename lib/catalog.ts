
export interface Example {
  id: string;
  name: string;
  description: string;
  url: (slug: string) => string;
  config: {
    repoUrl: string;
    branchName: string;
    appPort: string;
    runCommands: string;
    memorySize: string;
    cpuUnits : string;
    storageSize: string;
    deploymentDuration: string;
  };
}


// config: {
//   deploymentDuration: "1h",
//   memorySize: "1Gi",
//   cpuUnits: "0.5",
//   storageSize: "2Gi",
//   appPort: "22",
// },

// url: (slug: string) => `/app/services/vm/pre-configured/${slug}?from=/app/services/vm/pre-configured`,


// Examples list
export const examples: Example[] = [
  {
    id: "express-calculator",
    name: "Express Javascript Server",
    description:
      "Express.js Server with HTML rendered frontend. A simple web server with a calculator interface rendered directly from the backend.",
    url: (slug) => `/app/examples/${slug}?from=/app/deployments`,
    config: {
      repoUrl: "https://github.com/Aquanodeio/examples-deploy.git",
      runCommands:
        "cd javascript-calculator-server && npm install && npm start",
      branchName: "main",
      appPort: "3000",
      memorySize: "1Gi",
      cpuUnits: "0.5",
      storageSize: "2Gi",
      deploymentDuration: "1h",
    },
  },
  {
    id: "streamlit-calculator",
    name: "Streamlit Python Calculator",
    description:
      "Streamlit Python calculator example. Interactive calculator built with Python and Streamlit for a modern data-focused web interface.",
    url: (slug) => `/app/examples/${slug}?from=/app/deployments`,
    config: {
      repoUrl: "https://github.com/Aquanodeio/examples-deploy.git",
      branchName: "main",
      runCommands:
        "cd python-calculator-server && pip3 install -r requirements.txt && streamlit run main.py",
      appPort: "8501",
      memorySize: "1Gi",
      cpuUnits: "0.5",
      storageSize: "3Gi",
      deploymentDuration: "1h",
    },
  },
];
