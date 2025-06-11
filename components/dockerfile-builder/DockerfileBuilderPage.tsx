'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import SingleStageForm from './SingleStageForm'
import DockerfileOutput from './DockerfileOutput'

export type DockerStage = {
  baseImage: string
  labels: { key: string; value: string }[]
  args: { key: string; value: string }[]
  envs: { key: string; value: string }[]
  runs: string[]
  copies: { src: string; dest: string }[]
  workdir: string
  user: string
}

const defaultStage = (): DockerStage => ({
  baseImage: 'ubuntu:22.04',
  labels: [],
  args: [],
  envs: [],
  runs: [],
  copies: [],
  workdir: '',
  user: '',
})

export default function DockerfileBuilderPage() {
  const [stages, setStages] = useState<DockerStage[]>([defaultStage()])

  const updateStage = (i: number, updated: DockerStage) => {
    const newStages = [...stages]
    newStages[i] = updated
    setStages(newStages)
  }

  const addStage = () => {
    setStages([...stages, defaultStage()])
  }

  const generateDockerfile = () => {
    const lines: string[] = []

    stages.forEach((stage, idx) => {
      lines.push(`FROM ${stage.baseImage}${idx > 0 ? ` AS stage${idx}` : ''}`)

      stage.labels.filter(l => l.key).forEach(({ key, value }) =>
        lines.push(`LABEL ${key}="${value}"`)
      )
      stage.args.filter(a => a.key).forEach(({ key, value }) =>
        lines.push(`ARG ${key}=${value}`)
      )
      stage.envs.filter(e => e.key).forEach(({ key, value }) =>
        lines.push(`ENV ${key}=${value}`)
      )
      if (stage.workdir) lines.push(`WORKDIR ${stage.workdir}`)
      stage.copies.forEach(c => c.src && c.dest && lines.push(`COPY ${c.src} ${c.dest}`))
      stage.runs.forEach(cmd => cmd && lines.push(`RUN ${cmd}`))
      if (stage.user) lines.push(`USER ${stage.user}`)
      lines.push('')
    })

    return lines.join('\n').trim()
  }

  return (
    <div className="container pb-10 pt-6 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Dockerfile Builder</h1>

      <form className="space-y-8">
        {stages.map((stage, idx) => (
          <details key={idx} className="rounded-md border">
            <summary className="cursor-pointer select-none px-4 py-2 font-medium bg-muted">
              {`Stage ${idx + 1}: ${stage.baseImage || 'Unnamed'}`}
            </summary>
            <div className="p-4">
              <SingleStageForm
                index={idx}
                stage={stage}
                onChange={updated => updateStage(idx, updated)}
              />
            </div>
          </details>
        ))}

        <Button type="button" variant="secondary" onClick={addStage}>
          + Add Build Stage
        </Button>

        <DockerfileOutput dockerfile={generateDockerfile()} />
      </form>
    </div>
  )
}

