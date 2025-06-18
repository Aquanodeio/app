import {
  Github,
  Database,
  Monitor,
  Brain,
  List,
  DollarSign,
} from "lucide-react";
import { SuggestedPrompt } from "./types";

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    icon: Github,
    text: "Deploy a Node.js app from GitHub",
    prompt: "I want to deploy a Node.js application from https://github.com/username/my-app repository",
    category: "deployment"
  },
  {
    icon: Database,
    text: "Set up Jupyter notebook",
    prompt: "I need a Jupyter notebook environment for data science with pandas and scikit-learn",
    category: "jupyter"
  },
  {
    icon: Monitor,
    text: "Deploy a virtual machine",
    prompt: "I want to deploy an Ubuntu 22.04 VM with 2 CPUs and 4Gi RAM",
    category: "vm"
  },
  {
    icon: Brain,
    text: "Deploy AI model inference",
    prompt: "I need to deploy a large language model for inference",
    category: "inference"
  },
  {
    icon: List,
    text: "Show my deployments",
    prompt: "List all my current deployments and their status",
    category: "management"
  },
  {
    icon: DollarSign,
    text: "Check pricing",
    prompt: "What are the pricing options for different resource configurations?",
    category: "pricing"
  },
]; 