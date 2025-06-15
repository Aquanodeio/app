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

// Templates organized by category
export const templates: Record<string, Template[]> = {
  "Jupyter Notebooks": [
    {
      id: "jupyter-tensorflow-notebook",
      name: "Jupyter TensorFlow Notebook",
      description: "Jupyter notebook with TensorFlow, Keras, and deep learning libraries pre-installed. Perfect for ML model development and training.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "jupyter/tensorflow-notebook",
      config: {
        deploymentDuration: "3h",
        memorySize: "4Gi",
        cpuUnits: "2",
        storageSize: "10Gi",
        appPort: "8888",
      },
    },
    {
      id: "jupyter-scipy-notebook",
      name: "Jupyter SciPy Notebook",
      description: "Scientific computing environment with NumPy, SciPy, Matplotlib, and pandas for data analysis and scientific research.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "jupyter/scipy-notebook",
      config: {
        deploymentDuration: "2h",
        memorySize: "2Gi",
        cpuUnits: "1",
        storageSize: "5Gi",
        appPort: "8888",
      },
    },
    {
      id: "jupyter-datascience-notebook",
      name: "Jupyter Data Science Notebook",
      description: "Complete data science environment with R, Python, Julia, and popular data analysis libraries for comprehensive analytics.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "jupyter/datascience-notebook",
      config: {
        deploymentDuration: "2h",
        memorySize: "3Gi",
        cpuUnits: "1.5",
        storageSize: "8Gi",
        appPort: "8888",
      },
    },
    {
      id: "ezkl-notebook",
      name: "EZKL Notebook",
      description: "Specialized notebook environment for zero-knowledge machine learning with EZKL framework and TensorFlow integration.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "inferencelabs/ezkl-notebook",
      config: {
        deploymentDuration: "3h",
        memorySize: "4Gi",
        cpuUnits: "2",
        storageSize: "10Gi",
        appPort: "8888",
      },
    },
  ],
  "VMs": [
    {
      id: "pytorch-conda-cuda",
      name: "PyTorch Conda CUDA",
      description: "PyTorch environment with Conda package manager and CUDA support for GPU-accelerated deep learning development.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "pytorch/conda-cuda",
      config: {
        deploymentDuration: "3h",
        memorySize: "6Gi",
        cpuUnits: "2",
        storageSize: "15Gi",
        appPort: "8888",
      },
    },
    {
      id: "nvidia-cuda",
      name: "NVIDIA CUDA",
      description: "NVIDIA CUDA toolkit environment for GPU computing, parallel processing, and high-performance computing applications.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "nvidia/cuda",
      config: {
        deploymentDuration: "2h",
        memorySize: "4Gi",
        cpuUnits: "2",
        storageSize: "10Gi",
        appPort: "22",
      },
    },
    {
      id: "nvidia-tensorrt-llm",
      name: "NVIDIA TensorRT-LLM",
      description: "Optimized environment for large language model inference with NVIDIA TensorRT-LLM for high-performance AI serving.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "nvidia/tensorrt-llm",
      config: {
        deploymentDuration: "4h",
        memorySize: "8Gi",
        cpuUnits: "4",
        storageSize: "20Gi",
        appPort: "8000",
      },
    },
    {
      id: "ollama",
      name: "Ollama",
      description: "Run large language models locally with Ollama. Easy setup for LLaMA, CodeLlama, and other popular AI models.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "ollama/ollama",
      config: {
        deploymentDuration: "3h",
        memorySize: "8Gi",
        cpuUnits: "4",
        storageSize: "25Gi",
        appPort: "11434",
      },
    },
    {
      id: "tensorflow",
      name: "TensorFlow",
      description: "Official TensorFlow environment for machine learning model development, training, and deployment.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "tensorflow/tensorflow",
      config: {
        deploymentDuration: "3h",
        memorySize: "4Gi",
        cpuUnits: "2",
        storageSize: "12Gi",
        appPort: "8888",
      },
    },
    {
      id: "postgres",
      name: "PostgreSQL Database",
      description: "PostgreSQL relational database server for robust data storage, complex queries, and enterprise applications.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "postgres",
      config: {
        deploymentDuration: "2h",
        memorySize: "2Gi",
        cpuUnits: "1",
        storageSize: "10Gi",
        appPort: "5432",
      },
    },
  ],
  "OS VMs": [
    {
      id: "ubuntu-24-vm",
      name: "Ubuntu VM",
      description: "Lightweight Ubuntu VM with full SSH access, ideal for configuring your own stack from scratch.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "ubuntu",
      config: {
        deploymentDuration: "1h",
        memorySize: "1Gi",
        cpuUnits: "0.5",
        storageSize: "2Gi",
        appPort: "22",
      },
    },
    {
      id: "alpine",
      name: "Alpine VM",
      description: "Lightweight Alpine Linux VM with full SSH access, ideal for minimal resource usage and custom configurations.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "alpine",
      config: {
        deploymentDuration: "1h",
        memorySize: "1Gi",
        cpuUnits: "0.5",
        storageSize: "2Gi",
        appPort: "22",
      },
    },
    {
      id: "debian",
      name: "Debian VM",
      description: "Stable Debian Linux VM with full SSH access, perfect for production environments and enterprise applications.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "debian",
      config: {
        deploymentDuration: "1h",
        memorySize: "1Gi",
        cpuUnits: "0.5",
        storageSize: "2Gi",
        appPort: "22",
      },
    },
  ],
  "AI Models": [
    {
      id: "sglang-deepseek",
      name: "SGLang DeepSeek-R1",
      description: "DeepSeek-R1 Distill LLaMA 70B model with SGLang for high-performance language model inference and reasoning.",
      url: (id: string) => `/app/services/vm/pre-configured/${id}?from=/app/services/vm/pre-configured`,
      image: "lmsysorg/sglang:v0.4.1.post4-cu124-srt",
      config: {
        deploymentDuration: "4h",
        memorySize: "16Gi",
        cpuUnits: "8",
        storageSize: "50Gi",
        appPort: "30000",
      },
    },
    {
      id: "bert-sentiment-analysis",
      name: "BERT Sentiment Analysis",
      description: "Pre-trained BERT model for sentiment analysis with 69M downloads. Ready-to-use for text classification tasks.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "clydedevv/bert-sentiment-analysis:0.0.2",
      config: {
        deploymentDuration: "2h",
        memorySize: "4Gi",
        cpuUnits: "2",
        storageSize: "8Gi",
        appPort: "8000",
      },
    },
    {
      id: "stable-diffusion-ui",
      name: "Stable Diffusion UI",
      description: "User-friendly web interface for Stable Diffusion image generation with advanced features and customization options.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "s20081428/stable-diffusion-ui:v2.3",
      config: {
        deploymentDuration: "3h",
        memorySize: "8Gi",
        cpuUnits: "4",
        storageSize: "20Gi",
        appPort: "7860",
      },
    },
    {
      id: "deepseek-r1-distill-llama",
      name: "DeepSeek-R1 Distill LLaMA",
      description: "Most popular DeepSeek-R1 distilled LLaMA model with 47.9k downloads. Optimized for reasoning and instruction following.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "ai/deepseek-r1-distill-llama",
      config: {
        deploymentDuration: "4h",
        memorySize: "12Gi",
        cpuUnits: "6",
        storageSize: "30Gi",
        appPort: "8000",
      },
    },
    {
      id: "vllm-openai",
      name: "vLLM OpenAI",
      description: "Popular LLM inference framework supporting LLaMA, Mixtral, and other models with OpenAI-compatible API.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "vllm/vllm-openai:latest",
      config: {
        deploymentDuration: "3h",
        memorySize: "8Gi",
        cpuUnits: "4",
        storageSize: "25Gi",
        appPort: "8000",
      },
    },
    {
      id: "opengpt",
      name: "OpenGPT",
      description: "Popular open-source GPT implementation for conversational AI and text generation tasks.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "arc10/opengpt:v0.0.1",
      config: {
        deploymentDuration: "3h",
        memorySize: "6Gi",
        cpuUnits: "3",
        storageSize: "15Gi",
        appPort: "8080",
      },
    },
    {
      id: "open-webui-ollama",
      name: "Open WebUI with Ollama",
      description: "Web-based interface for Ollama models providing ChatGPT-like experience for local LLM interactions.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "ghcr.io/open-webui/open-webui:ollama",
      config: {
        deploymentDuration: "2h",
        memorySize: "4Gi",
        cpuUnits: "2",
        storageSize: "10Gi",
        appPort: "8080",
      },
    },
    {
      id: "whisper-gui",
      name: "Whisper GUI",
      description: "User-friendly graphical interface for OpenAI Whisper speech-to-text transcription with drag-and-drop support.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "3x3cut0r/whisper-gui:latest",
      config: {
        deploymentDuration: "2h",
        memorySize: "3Gi",
        cpuUnits: "2",
        storageSize: "8Gi",
        appPort: "8000",
      },
    },
    {
      id: "whisper-gpu",
      name: "Whisper GPU",
      description: "GPU-accelerated OpenAI Whisper ASR web service for fast and accurate speech-to-text transcription.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "onerahmet/openai-whisper-asr-webservice:latest-gpu",
      config: {
        deploymentDuration: "3h",
        memorySize: "6Gi",
        cpuUnits: "4",
        storageSize: "15Gi",
        appPort: "9000",
      },
    },
  ],
  "Games": [
    {
      id: "minecraft-server",
      name: "Minecraft Server",
      description: "Dedicated Minecraft server with customizable settings, mods support, and multiplayer capabilities.",
      url: (id: string) => `/app/templates/${id}?from=/app/templates`,
      image: "itzg/minecraft-server",
      config: {
        deploymentDuration: "2h",
        memorySize: "4Gi",
        cpuUnits: "2",
        storageSize: "10Gi",
        appPort: "25565",
      },
    },
  ],
};

// Examples list
export const examples: Example[] = [
  {
    id: "express-calculator",
    name: "Express Javascript Server",
    description:
      "Express.js Server with HTML rendered frontend. A simple web server with a calculator interface rendered directly from the backend.",
    url: (id) => `/app/examples/${id}?from=/app/deployments`,
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
    url: (id) => `/app/examples/${id}?from=/app/deployments`,
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


// oneClickApps
export const oneClickApps = {
}
// Template categories for filtering
export const templateCategories = [
  "All",
  ...Object.keys(templates),
];
