import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code, Terminal, Package, Folder, Globe } from "lucide-react";

interface BuildSettingsProps {
  runCommand: string;
  setRunCommand: (value: string) => void;
  outputDirectory?: string;
  setOutputDirectory?: (value: string) => void;
  installCommand?: string;
  setInstallCommand?: (value: string) => void;
  portNumber: number;
  setPortNumber: (number: number) => void;
}

export default function BuildSettings({
  runCommand,
  setRunCommand,
  outputDirectory = "",
  setOutputDirectory,
  installCommand = "",
  setInstallCommand,
  portNumber,
  setPortNumber,
}: BuildSettingsProps) {
  return (
    <div className="dashboard-card mb-8">
      <h3 className="text-lg font-medium mb-4">Build Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {setInstallCommand && (
          <div>
            <Label htmlFor="install-command" className="text-sm font-medium mb-2 block">
              Install Command
            </Label>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="install-command"
                  placeholder="npm install"
                  value={installCommand}
                  onChange={(e) => setInstallCommand(e.target.value)}
                  className="w-full h-10 text-sm bg-secondary/10 border-border/30 pl-10"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Command used to install dependencies
            </p>
          </div>
        )}


        <div>
          <Label htmlFor="run-command" className="text-sm font-medium mb-2 block">
            Run Command
          </Label>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Terminal className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="run-command"
                placeholder="npm start"
                value={runCommand}
                onChange={(e) => setRunCommand(e.target.value)}
                className="w-full h-10 text-sm bg-secondary/10 border-border/30 pl-10"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            Command to start your application
          </p>
        </div>

        <div>
          <Label htmlFor="port-number" className="text-sm font-medium mb-2 block">
            Port
          </Label>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="port-number"
                type="number"
                placeholder="3000"
                value={portNumber}
                onChange={(e) => setPortNumber(parseInt(e.target.value) || 3000)}
                className="w-full h-10 text-sm bg-secondary/10 border-border/30 pl-10"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            The port your application will listen on
          </p>
        </div>

        {setOutputDirectory && (
          <div>
            <Label htmlFor="output-directory" className="text-sm font-medium mb-2 block">
              Output Directory
            </Label>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="output-directory"
                  placeholder="dist"
                  value={outputDirectory}
                  onChange={(e) => setOutputDirectory(e.target.value)}
                  className="w-full h-10 text-sm bg-secondary/10 border-border/30 pl-10"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Directory where your built files are output
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 