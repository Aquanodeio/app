# Standardized Service Architecture

This document outlines the standardized approach for implementing services in the application. By following this architecture, we ensure consistency across services while still allowing for service-specific customizations.

## Directory Structure

```
app/app/services/
├── [service-name]/      # e.g., custom, jupyter, etc.
│   ├── page.tsx         # Service overview/landing page
│   ├── deploy/
│   │   ├── page.tsx     # Original service deployment page (legacy)
│   │   └── standardized.tsx   # Standardized implementation (recommended)

components/services/
├── common/              # Shared components and utilities
│   ├── ServiceDeployPage.tsx  # Core deployment page component
│   ├── DeploymentOptionCard.tsx # Card component for deployment options
│   ├── interfaces.ts    # Standardized interfaces
│   └── helpers.tsx      # Standardized helper functions
├── backend/             # Backend service specific components
│   ├── SourceControlSection.tsx
│   ├── EnviromentVariableSection.tsx
│   └── ResourceSettingSection.tsx
```

## Standardized Components

### Common Components

Located in `components/services/common/`:

- `ServiceDeployPage.tsx`: The standardized deployment page component used across all services
- `DeploymentOptionCard.tsx`: Card component for displaying deployment options
- `ServicePage.tsx`: Common service page structure
- `interfaces.ts`: Standardized interfaces used across all services
- `helpers.tsx`: Standardized helper functions used across all services

### Service-Specific Sections

Located in `components/services/backend/` or other service-specific directories:

- `SourceControlSection.tsx`: For services that require source control integration
- `EnviromentVariableSection.tsx`: For services that need environment variables configuration
- `ResourceSettingSection.tsx`: Resource allocation controls (shared across all services)

## Standardized Interfaces

Common interfaces in `components/services/common/interfaces.ts`:

- `DeploymentOption`: Interface for deployment options
- `ResourceValueOptions`: Interface for resource value options
- `DeploymentResourceConfig`: Interface for deployment resource configuration

## Standardized Helpers

Common helper functions in `components/services/common/helpers.tsx`:

- `createDeploymentOptions()`: Creates deployment options for a service
- `createDefaultResourceValues()`: Creates default resource values
- `createResourceConfig()`: Creates a resource configuration from values
- `createDefaultResourceConfig()`: Creates a default resource configuration

## How to Implement a New Service

1. Create a new service directory in `app/app/services/[new-service-name]`
2. Create a `page.tsx` file for the service landing page
3. Create a `deploy` directory with:
   - `standardized.tsx` - Use the `ServiceDeployPage` component with appropriate customizations
   - `interface.ts` - Define service-specific interfaces
   - `helpers.tsx` - If needed, implement service-specific helper functions

### Example Implementation

```tsx
// app/app/services/new-service/deploy/standardized.tsx
"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useCreateDeployment } from "@/hooks/queries/useCreateDeployment";
import ServiceDeployPage from "@/components/services/common/ServiceDeployPage";
import { ResourceValueOptions } from "@/components/services/common/interfaces";
import { 
  createDeploymentOptions, 
  createDefaultResourceValues,
  createResourceConfig
} from "@/components/services/common/helpers";
import ResourceSettingSection from "@/components/services/backend/ResourceSettingSection";
// Import other required components and types

export default function NewServiceDeployment() {
  // State and handlers implementation
  
  return (
    <ServiceDeployPage
      title="Deploy New Service"
      description="Description of the service"
      deploymentOptions={deploymentOptions}
      // Include service-specific sections as needed
      sourceControlSection={/* Source control component if needed */}
      environmentVariablesSection={/* Env vars component if needed */}
      resourceSettingSection={
        <ResourceSettingSection
          values={values}
          setValues={setValues}
        />
      }
      handleDefaultDeploy={handleDefaultDeploy}
      handleCustomDeploy={handleCustomDeploy}
      isLoading={isLoading}
    />
  );
}
```

## Service Customization

While the layout and structure remain standardized, services can be customized in the following ways:

1. **Source Control**: Services can implement custom source control integration or use the standard one
2. **Environment Variables**: Services can have different default environment variables or completely custom ones
3. **Resource Settings**: All services use the same resource control section
4. **Deployment Logic**: Each service implements its own deployment logic in `handleDefaultDeploy` and `handleCustomDeploy` functions

## Best Practices

1. Always use the standardized components, interfaces, and helpers
2. Keep service-specific code in dedicated files/components
3. Implement new shared functionality in the common components
4. Follow existing naming conventions and code style 