import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Props = {
  dockerfile: string
}

export default function DockerfileOutput({ dockerfile }: Props) {
  const download = () => {
    const blob = new Blob([dockerfile], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'Dockerfile'
    a.click()
  }

  return (
    <div className="space-y-4">
      <Button onClick={download} type="button" className="w-fit">
        Download Dockerfile
      </Button>
      <Card className="bg-black text-green-300 font-mono p-4 whitespace-pre-wrap">
        {dockerfile}
      </Card>
    </div>
  )
}
