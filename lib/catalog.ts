export interface Template {
  id: string;
  name: string;
  description: string;
  url: (id: string) => string;
  image: string;
  config: {
    deploymentDuration: string;
    memorySize: string;
    cpuUnits: string;
    storageSize: string;
    appPort: string;
  };
}

export interface Example {
  id: string;
  name: string;
  description: string;
  url: (id: string) => string;
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

// Template list
export const templates: Template[] = [
  {
    id: "ubuntu-24-vm",
    name: "Ubuntu 24 VM",
    description:
      "Lightweight Ubuntu 24.04 VM with full SSH access, ideal for configuring your own stack from scratch.",
    url: (id) => `/app/templates/${id}?from=/app/templates`,
    image: "spheronfdn/ubuntu:24.04",
    config: {
      deploymentDuration: "1h",
      memorySize: "1Gi",
      cpuUnits: "0.5",
      storageSize: "2Gi",
      appPort: "3000",
    },
  },
];

// Examples list
export const examples: Example[] = [
  {
    id: "express-calculator",
    name: "Express Javascript Server",
    description:
      "Express.js Server with HTML rendered frontend. A simple web server with a calculator interface rendered directly from the backend.",
    url: (id) => `/app/examples/${id}?from=/app/deployments`,
    config: {
      repoUrl: "https://github.com/Aquanodeio/templates.git",
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
    url: (id) => `/app/examples/${id}?from=/app/deployments`,
    config: {
      repoUrl: "https://github.com/Aquanodeio/templates.git",
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
