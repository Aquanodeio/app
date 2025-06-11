import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/design-system'
import { FaDocker } from 'react-icons/fa'

import KeyValueList from './fields/KeyValueList'
import RunList from './fields/RunList'
import CopyList from './fields/CopyList'

import type { DockerStage } from './DockerfileBuilderPage'

type Props = {
  stage: DockerStage
  onChange: (updated: DockerStage) => void
  index: number
}

const baseImageOptions = [
  'ubuntu:22.04',
  'node:18-alpine',
  'python:3.11-slim',
  'golang:1.21-alpine',
  'rust:slim',
  'alpine:3.18',
  'debian:bookworm',
  'custom'
]

export default function SingleStageForm({ stage, onChange, index }: Props) {
  const update = <K extends keyof DockerStage>(key: K, value: DockerStage[K]) =>
    onChange({ ...stage, [key]: value })

  const isCustom = !baseImageOptions.includes(stage.baseImage)

  return (
    <Card className="p-6 space-y-6 border border-muted-foreground/20">
      {/* Base Image */}
      <div className="space-y-1">
        <Label>Stage {index + 1} Base Image</Label>
        <select
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          value={isCustom ? 'custom' : stage.baseImage}
          onChange={(e) => {
            const val = e.target.value
            update('baseImage', val === 'custom' ? '' : val)
          }}
        >
          {baseImageOptions.map((img) => (
            <option key={img} value={img}>
              {img === 'custom' ? 'Custom...' : img}
            </option>
          ))}
        </select>

        {isCustom && (
          <Input
            className="mt-2"
            placeholder="Enter custom base image"
            value={stage.baseImage}
            onChange={e => update('baseImage', e.target.value)}
          />
        )}

        <Text variant="small" muted>
          Image used for this build stage.
        </Text>
      </div>

      {/* LABEL / ARG / ENV */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KeyValueList
          label="Labels"
          items={stage.labels}
          onChange={val => update('labels', val)}
          helper="LABEL <key>=<value> metadata"
        />
        <KeyValueList
          label="Build Args"
          items={stage.args}
          onChange={val => update('args', val)}
          helper="ARG <key>=<value> (build-time)"
        />
        <KeyValueList
          label="Environment Variables"
          items={stage.envs}
          onChange={val => update('envs', val)}
          helper="ENV <key>=<value>"
        />
      </div>

      {/* RUN + COPY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RunList
          commands={stage.runs}
          onChange={val => update('runs', val)}
        />
        <CopyList
          entries={stage.copies}
          onChange={val => update('copies', val)}
        />
      </div>

      {/* WORKDIR / USER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <Label>WORKDIR</Label>
          <Input
            placeholder="/app"
            value={stage.workdir}
            onChange={e => update('workdir', e.target.value)}
          />
          <Text variant="small" muted>
            Working directory for CMD/RUN/ENTRYPOINT.
          </Text>
        </div>

        <div className="space-y-1">
          <Label>USER</Label>
          <Input
            placeholder="node"
            value={stage.user}
            onChange={e => update('user', e.target.value)}
          />
          <Text variant="small" muted>
            Set user before CMD/RUN/etc.
          </Text>
        </div>
      </div>
    </Card>
  )
}

