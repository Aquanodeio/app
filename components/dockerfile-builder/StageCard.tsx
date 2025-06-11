import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { StageData, KeyValue, CopyEntry } from './DockerfileBuilderPage'
import KeyValueList from './fields/KeyValueList'
import RunList from './fields/RunList'
import CopyList from './fields/CopyList'

type Props = {
  index: number
  stage: StageData
  onChange: (index: number, updated: StageData) => void
  onDelete: (index: number) => void
}

export default function StageCard({ index, stage, onChange, onDelete }: Props) {
  const update = (partial: Partial<StageData>) =>
    onChange(index, { ...stage, ...partial })

  return (
    <Card className="p-6 space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Stage {index + 1}</h2>
        {index > 0 && (
          <Button variant="destructive" onClick={() => onDelete(index)}>
            Delete Stage
          </Button>
        )}
      </div>

      <div>
        <Label>Base Image</Label>
        <Input
          value={stage.baseImage}
          onChange={e => update({ baseImage: e.target.value })}
        />
      </div>

      <div>
        <Label>Alias (for multi-stage)</Label>
        <Input
          placeholder="e.g. builder"
          value={stage.alias}
          onChange={e => update({ alias: e.target.value })}
        />
      </div>

      <KeyValueList
        label="Labels"
        items={stage.labels}
        onChange={labels => update({ labels })}
      />

      <KeyValueList
        label="Build Args"
        items={stage.args}
        onChange={args => update({ args })}
      />

      <KeyValueList
        label="Environment Variables"
        items={stage.envs}
        onChange={envs => update({ envs })}
      />

      <RunList
        label="RUN Commands"
        items={stage.runs}
        onChange={runs => update({ runs })}
      />

      <CopyList
        label="COPY Files"
        items={stage.copies}
        onChange={copies => update({ copies })}
      />

      <div>
        <Label>WORKDIR</Label>
        <Input
          value={stage.workdir}
          onChange={e => update({ workdir: e.target.value })}
        />
      </div>

      <div>
        <Label>EXPOSE</Label>
        <Input
          placeholder="e.g. 3000"
          value={stage.expose}
          onChange={e => update({ expose: e.target.value })}
        />
      </div>

      <div>
        <Label>ENTRYPOINT</Label>
        <Input
          placeholder='e.g. node app.js'
          value={stage.entrypoint}
          onChange={e => update({ entrypoint: e.target.value })}
        />
      </div>

      <div>
        <Label>CMD</Label>
        <Input
          placeholder="e.g. npm start"
          value={stage.cmd}
          onChange={e => update({ cmd: e.target.value })}
        />
      </div>

      <div>
        <Label>USER</Label>
        <Input
          placeholder="e.g. node"
          value={stage.user}
          onChange={e => update({ user: e.target.value })}
        />
      </div>
    </Card>
  )
}
