import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type Props = {
  commands: string[]
  onChange: (updated: string[]) => void
}

export default function RunList({ commands, onChange }: Props) {
  const update = (i: number, val: string) => {
    const updated = [...commands]
    updated[i] = val
    onChange(updated)
  }

  const add = () => onChange([...commands, ''])

  return (
    <div>
      <Label>RUN Commands</Label>
      {commands.map((cmd, i) => (
        <Input
          key={i}
          className="mt-2"
          placeholder="e.g. apt-get install -y curl"
          value={cmd}
          onChange={e => update(i, e.target.value)}
        />
      ))}
      <Button type="button" variant="ghost" onClick={add} className="mt-2">
        + Add RUN
      </Button>
    </div>
  )
}
