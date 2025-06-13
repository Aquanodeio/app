import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { KeyValue } from '../DockerfileBuilderPage'

type Props = {
  label: string
  items: KeyValue[]
  onChange: (updated: KeyValue[]) => void
}

export default function KeyValueList({ label, items, onChange }: Props) {
  const update = (i: number, key: string, value: string) => {
    const updated = [...items]
    updated[i] = { key, value }
    onChange(updated)
  }

  const add = () => {
    onChange([...items, { key: '', value: '' }])
  }

  return (
    <div>
      <Label>{label}</Label>
      {items.map((kv, i) => (
        <div key={i} className="flex gap-2 mt-2">
          <Input
            placeholder="key"
            value={kv.key}
            onChange={e => update(i, e.target.value, kv.value)}
          />
          <Input
            placeholder="value"
            value={kv.value}
            onChange={e => update(i, kv.key, e.target.value)}
          />
        </div>
      ))}
      <Button variant="ghost" type="button" onClick={add} className="mt-2">
        + Add {label.split(' ')[0]}
      </Button>
    </div>
  )
}
