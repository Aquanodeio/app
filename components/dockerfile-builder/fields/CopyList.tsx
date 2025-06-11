import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CopyEntry } from '../DockerfileBuilderPage'

type Props = {
  entries: CopyEntry[]
  onChange: (updated: CopyEntry[]) => void
}

export default function CopyList({ entries, onChange }: Props) {
  const update = (i: number, key: keyof CopyEntry, val: string) => {
    const updated = [...entries]
    updated[i][key] = val
    onChange(updated)
  }

  const add = () => onChange([...entries, { src: '', dest: '' }])

  return (
    <div>
      <Label>COPY Files</Label>
      {entries.map((entry, i) => (
        <div key={i} className="flex gap-2 mt-2">
          <Input
            placeholder="source"
            value={entry.src}
            onChange={e => update(i, 'src', e.target.value)}
          />
          <Input
            placeholder="destination"
            value={entry.dest}
            onChange={e => update(i, 'dest', e.target.value)}
          />
        </div>
      ))}
      <Button type="button" variant="ghost" onClick={add} className="mt-2">
        + Add COPY
      </Button>
    </div>
  )
}
