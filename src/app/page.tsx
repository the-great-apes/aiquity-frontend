import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Input, InputGroup } from '@/components/input'
import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/button'
import { Strong, Text, TextLink } from '@/components/text'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Overview } from '@/components/overview';
import { Kpi, columns } from "./kpi/columns"
import { DataTable } from "./kpi/data-table"

async function getData(): Promise<Kpi[]> {
  // Fetch data from your API here.
  return [
    {
      kpi: "Revenue",
      value: 100,
      change: 99,
      year: 2024,
      context: "this is context"
    },
    {
      kpi: "COGS",
      value: 2000,
      change: 32,
      year: 2024,
      context: "this is context"
    },
    // ...
  ]
}

export function Stat({ title, value, change }: Readonly<{ title: string; value: string; change: string }>) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last year</span>
      </div>
    </div>
  )
}

export default async function Home() {
  const data = await getData()
  return (
    <>
      <div className="mt-2 flex items-end justify-between">
        <InputGroup>
          <MagnifyingGlassIcon />
          <Input name="search" placeholder="Search Company&hellip;" />
        </InputGroup>
        <div className="flex items-center space-x-4">
          <Select name="period">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </Select>
          <Button color='white'>
            <StarIcon className="h-5 w-5 stroke-black stroke-2 fill-white hover:fill-black" />
          </Button>
          <Button>Export</Button>
        </div>
      </div>
      <Divider className='mt-5'></Divider>
      <Heading className="mt-5" level={2}>IBM Annual Report</Heading>
      <div className="mt-3 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">{"This is an executive summary of Cash Money Bitches."}</div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Revenue" value="$2.6M" change="+4.5%" />
        <Stat title="COGS" value="$455" change="-0.5%" />
        <Stat title="Free Cash Flow" value="5,888" change="+4.5%" />
        <Stat title="EBITDA" value="823,067" change="+21.2%" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Major Drivers</CardTitle>
            <CardDescription>
              Events that impacted revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Once upon a time in the land of Pipipupu, there was a curious creature named Pipipupucheck. This land was unlike any other, filled with vibrant colors, magical sounds, and whimsical beings. Pipipupucheck, a small, fluffy creature with shimmering fur and twinkling eyes, was known for its knack for finding hidden treasures and solving riddles.

              Every morning, Pipipupucheck would embark on an adventure through the Misty Meadows and the Enchanted Forest, where the trees whispered secrets and the flowers sang melodies. The creature loved to play games with the forest sprites and dance with the fireflies under the moonlight.

              One day, Pipipupucheck stumbled upon a mysterious, glowing map buried beneath an ancient willow tree. The map was inscribed with peculiar symbols and led to a hidden treasure said to grant any wish. Excited and determined, Pipipupucheck set off on a quest, following the map's intricate paths and solving puzzles along the way.</Text>
          </CardContent>
        </Card>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
