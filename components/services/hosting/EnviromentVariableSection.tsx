import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/design-system";
import { Plus, Trash2 } from "lucide-react";

interface EnvVar {
  key: string;
  value: string;
}

export default function EnviromentVariableSection({
  envVarsJson,
  setEnvVarsJson,
}: {
  envVarsJson: string;
  setEnvVarsJson: (value: string) => void;
}) {
  const [envVars, setEnvVars] = useState<EnvVar[]>([]);
  const isInternalUpdate = useRef(false);

  // Parse JSON to env vars on mount and when JSON changes externally
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

    try {
      if (envVarsJson) {
        const parsed = JSON.parse(envVarsJson);
        const vars = Object.entries(parsed).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setEnvVars(vars);
      } else {
        setEnvVars([]);
      }
    } catch (error) {
      setEnvVars([]);
    }
  }, [envVarsJson]);

  // Convert env vars to JSON whenever they change
  const updateJson = (newEnvVars: EnvVar[]) => {
    const jsonObj: Record<string, string> = {};
    newEnvVars.forEach(({ key, value }) => {
      if (key.trim()) {
        jsonObj[key.trim()] = value;
      }
    });
    isInternalUpdate.current = true;
    setEnvVarsJson(JSON.stringify(jsonObj, null, 2));
  };

  const addEnvVar = () => {
    const newEnvVars = [...envVars, { key: "", value: "" }];
    setEnvVars(newEnvVars);
    updateJson(newEnvVars);
  };

  const removeEnvVar = (index: number) => {
    const newEnvVars = envVars.filter((_, i) => i !== index);
    setEnvVars(newEnvVars);
    updateJson(newEnvVars);
  };

  const updateEnvVar = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    const newEnvVars = envVars.map((env, i) =>
      i === index ? { ...env, [field]: newValue } : env
    );
    setEnvVars(newEnvVars);
    updateJson(newEnvVars);
  };

  return (
    <div className="card-primary space-component">
      <div className="space-element">
        <h3 className="heading-3 space-tight">Environment Variables</h3>
        <p className="body-small text-muted-foreground">
          Define environment variables for your deployment
        </p>
      </div>

      <div className="space-y-4">
        {envVars.length > 0 && (
          <div className="grid grid-cols-12 gap-3 text-sm font-medium text-muted-foreground">
            <div className="col-span-5">Key</div>
            <div className="col-span-6">Value</div>
            <div className="col-span-1"></div>
          </div>
        )}

        {envVars.map((envVar, index) => (
          <div key={index} className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-5">
              <Input
                placeholder="EXAMPLE_NAME"
                value={envVar.key}
                onChange={(e) => updateEnvVar(index, "key", e.target.value)}
                className="h-10 text-sm bg-secondary/10 border-border/30"
              />
            </div>
            <div className="col-span-6">
              <Input
                placeholder="Value"
                value={envVar.value}
                onChange={(e) => updateEnvVar(index, "value", e.target.value)}
                className="h-10 text-sm bg-secondary/10 border-border/30"
              />
            </div>
            <div className="col-span-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEnvVar(index)}
                className="h-10 w-10 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="ghost"
          size="sm"
          onClick={addEnvVar}
          className="h-10 gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          Add More
        </Button>
      </div>
    </div>
  );
}
