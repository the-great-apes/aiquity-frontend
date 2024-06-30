"use client"

import React, { useState } from 'react'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Heading } from '@/components/heading'
import { Select } from '@/components/select'
import { Input, InputGroup } from '@/components/input'
import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/button'
import { Text, TextLink } from '@/components/text'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Overview } from '@/components/overview';
import { columns } from "./kpi/columns"
import { DataTable } from "./kpi/data-table"
import Drawer from '@/components/ui/drawer'

function Stat({ title, value, change }: Readonly<{ title: string; value: string; change: string }>) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith("+") ? "lime" : "pink"}>{change}</Badge>{" "}
        <span className="text-zinc-500">from last year</span>
      </div>
    </div>
  );
}

function formatNumber(number: number): string {
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else {
    return number.toString();
  }
}

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [drawerTitle, setDrawerTitle] = useState("");
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2023");
  const [data, setData] = useState<any>(null);

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch(`http://localhost/${search}/${year}`);
    const result = await response.json();
    // Handle the result, setting state with the new data
    setData(result);
  }

  function handleSourceClick(index: number) {
    if (data && data.kpis && data.kpis[index]) {
      setDrawerTitle(`Source [${index + 1}]`);
      setDrawerContent(data.kpis[index].context);
      setDrawerOpen(true);
    }
  }

  if (!data) {
    return (
      <form onSubmit={handleSearch}>
        <div className="mt-2 flex items-end justify-between">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Company&hellip;"
            />
          </InputGroup>
          <div className="flex items-center space-x-4">
            <Select
              name="period"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </Select>
            <Button color="white">
              <StarIcon className="h-5 w-5 stroke-black stroke-2 fill-white hover:fill-black" />
            </Button>
            <Button type="button">Export</Button>
          </div>
        </div>
      </form>
    );
  }

  const formattedSources = data.kpis.map((kpi: any, index: number) => (
    <React.Fragment key={index}>
      <TextLink
        onClick={(e) => {
          e.preventDefault();
          handleSourceClick(index);
        }}
        href="#"
      >
        [{index + 1}]
      </TextLink>
      {index < data.kpis.length - 1 && ", "}
    </React.Fragment>
  ));

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="mt-2 flex items-end justify-between">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Company&hellip;"
            />
          </InputGroup>
          <div className="flex items-center space-x-4">
            <Select
              name="period"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </Select>
            <Button color="white">
              <StarIcon className="h-5 w-5 stroke-black stroke-2 fill-white hover:fill-black" />
            </Button>
            <Button type="button">Export</Button>
          </div>
        </div>
      </form>
      <Divider className="mt-5"></Divider>
      <Heading className="mt-5" level={2}>
        IBM Annual Report
      </Heading>
      <div className="mt-3 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {"This is an executive summary of Cash Money Bitches."}
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Revenue"
          value={`$${formatNumber(data.kpis[0].value)}`}
          change="+4.5%"
        />
        <Stat
          title="COGS"
          value={`$${formatNumber(data.kpis[2].value)}`}
          change="-0.5%"
        />
        <Stat
          title="Free Cash Flow"
          value={`$${formatNumber(data.kpis[1].value)}`}
          change="+4.5%"
        />
        <Stat title="EBITDA" value="$823,067" change="+21.2%" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview
              data={[
                { name: "2019", total: 3000000 },
                { name: "2020", total: 4433200 },
              ]}
            />
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
            <Text>
              Once upon a time in the land of Pipipupu, there was a curious creature named Pipipupucheck. This land was unlike any other, filled with vibrant colors, magical sounds, and whimsical beings. Pipipupucheck, a small, fluffy creature with shimmering fur and twinkling eyes, was known for its knack for finding hidden treasures and solving riddles.

              Every morning, Pipipupucheck would embark on an adventure through the Misty Meadows and the Enchanted Forest, where the trees whispered secrets and the flowers sang melodies. The creature loved to play games with the forest sprites and dance with the fireflies under the moonlight.

              One day, Pipipupucheck stumbled upon a mysterious, glowing map buried beneath an ancient willow tree. The map was inscribed with peculiar symbols and led to a hidden treasure said to grant any wish. Excited and determined, Pipipupucheck set off on a quest, following the map&#39;s intricate paths and solving puzzles along the way.
              <br /><br />Sources: {formattedSources}
            </Text>
          </CardContent>
        </Card>
      </div>
      <div className='container mx-auto py-10'>
        <DataTable columns={columns} data={data.kpis} />
      </div>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerTitle}
        content={drawerContent}
      />
    </>
  );
}