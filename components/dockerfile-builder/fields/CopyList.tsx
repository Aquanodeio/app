import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CopyEntry } from '../DockerfileBuilderPage'

type Props = {
  entries: CopyEntry[]
  onChange: (updated: CopyEntry[]) => void
  availableAliases: string[] // passed from parent to populate --from dropdown
}

export default function CopyList({ entries, onChange, availableAliases }: Props) {
  const update = (i: number, key: keyof CopyEntry, val: string) => {
    const updated = [...entries]
    updated[i][key] = val
    onChange(updated)
  }

  const add = () => onChange([...entries, { src: '', dest: '', from: '' }])

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">COPY Files</Label>
      {entries.map((entry, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-2">
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
          <select
            className="rounded-md border bg-background px-2 py-2 text-sm"
            value={entry.from || ''}
            onChange={e => update(i, 'from', e.target.value)}
          >
            <option value="">— current stage —</option>
            {availableAliases.map(alias => (
              <option key={alias} value={alias}>{alias}</option>
            ))}
          </select>
        </div>
      ))}
      <Button type="button" variant="ghost" onClick={add}>
        + Add COPY
      </Button>
    </div>
  )
}

