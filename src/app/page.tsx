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
import { columns, Kpi as ColumnKpi } from "./kpi/columns"
import { DataTable } from "./kpi/data-table"
import Drawer from '@/components/ui/drawer'


type Driver = {
  content: string
  context: string[]
}

type Kpi = {
  name: string
  value: number
  currency: string
  context: string
  driver: Driver
  history: { year: number, value: number }[]
}

type Data = {
  company: string
  year: number
  kpis: Kpi[]
}

const dummyData: Data = {
  company: "IBM",
  year: 2023,
  kpis: [
    {
      name: "Revenue",
      value: 61900000000.0,
      currency: "$",
      context: "Source 1: Today's IBM is more capable and more productive. We have a strong portfolio and a solid foundation to support sustainable growth. We are delivering on our promise to be the catalyst that makes the world work better 2023 performance: For the year, IBM generated $61.9 billion in revenue, up 3% at constant currency, and $11.2 billion of free cash flow, up $1.9 billion year-over-year. We experienced growing demand for our new watsonx platform, marked by thousands of client interactions.",
      driver: {
        content: "The major drivers behind IBM's revenue change in 2023 include margin expansion in Hybrid Infrastructure, increased demand for the watsonx platform, and growth in high-value offerings in Consulting and Software. The company also benefited from productivity initiatives and changes in the useful life of servers and network equipment",
        context: ["The increase was driven by margin expansion in Hybrid Infrastructure across both Distributed Infrastructure and zSystems, reflecting our continued focus on productivity initiatives including streamlining our supply chain, partially offset by margin decline in Infrastructure Support due to product cycle dynamics. Pre-tax income of $2,421 million increased 7.0 percent and pre-tax margin increased 1.8 points to 16.6 percent primarily driven by the increase in gross profit contribution, an increase in IP and custom development income, a benefit from the changes in the useful life of servers and network equipment and productivity actions. Pre-tax margin in 2023 included approximately 1 point of impact from currency. # Financing Refer to pages 38 through 40 for a discussion of Financing's segment results. Geographic Revenue In addition to the revenue presentation by reportable segment, we also measure revenue performance on a geographic basis. ($ in millions) | For the year ended December 31: | 2023 | 2022 | Yr .- to-Yr. Percent Change | Yr .- to-Yr. Percent Change Adjusted for Currency | | - | - | - | - | - | | Total revenue | $ 61,860 | $ 60,530 | 2.2 % | 2.9 % | | Americas | $ 31,666 | $ 31,057 | 2.0 % | 2.5 % | | Europe/Middle East/Africa | 18,492 | 17,950 | 3.0 | 1.3 | | Asia Pacific | 11,702 | 11,522 | 1.6 | 6.5 | Total revenue of $61,860 million in 2023 increased 2.2 percent year to year as reported and 3 percent adjusted for currency. Americas revenue increased 2.0 percent as reported and 2 percent adjusted for currency."]
      },
      history: [
        { year: 2021, value: 57350000000 },
        { year: 2022, value: 60530000000 },
        { year: 2023, value: 61900000000 }
      ]
    },
    {
      name: "COGS",
      value: 27842000000,
      currency: "$",
      context: "Source 1: For the period from 1923 to 1958, the Company was audited by firms that a predecessor firm to PricewaterhouseCoopers LLP ultimately acquired. # Consolidated Income Statement International Business Machines Corporation and Subsidiary Companies ($ in millions except per share amounts) | For the year ended December 31: | Notes | 2023 | 2022 | 2021 | | - | - | - | - | - | | Revenue | | | | | | Services | | $ 30,378 | $ 30,206 | $ 29,225 | | Sales | | 30,745 | 29,673 | 27,346 | | Financing | | 737 | 651 | 780 | | Total revenue | C | 61,860 | 60,530 | 57,350",
      driver: {
        content: "The major drivers behind IBM's Cost of Goods Sold (COGS) or Cost of Materials change in 2022 include investments in their hybrid cloud and AI strategy, higher labor and component costs, and the impacts of currency fluctuations. These factors were partially offset by mitigating hedging benefits and operational productivity and efficiency improvements [2].",
        context: []
      },
      history: [
        { year: 2021, value: 24314000000 },
        { year: 2022, value: 25865000000 },
        { year: 2023, value: 27842000000 }
      ]
    },
    {
      name: "Free Cash Flow",
      value: 10400000000,
      currency: "$",
      context: "Source 1: On a consolidated basis, we generated $10.4 billion in cash from operations and $9.3 billion in free cash flow and returned $5.9 billion to shareholders in dividends. We are pleased with the fundamentals of our busi).",
      driver: {
        content: "The major drivers behind IBM's cash flow change in 2022 include improvements in working capital driven by efficiencies in collections and mainframe cycle dynamics, higher cash tax payments, and payments for structural actions in 2021. Additionally, there was an increase in capital expenditures in 2022 to support IBM's strategy [2].",
        context: []
      },
      history: [
        { year: 2021, value: 9200000000 },
        { year: 2022, value: 9800000000 },
        { year: 2023, value: 10400000000 }
      ]
    }
  ]
};

type StatProps = {

  title: string,

  value: string,

  change: string,

  index: number,

  handleClick: (index: number) => void,

  selected: boolean

};



function Stat({ title, value, change, index, handleClick, selected }: StatProps) {

  return (

    <div

      onClick={() => handleClick(index)}

      className={`border p-4 rounded-lg cursor-pointer ${selected ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}

      style={{ cursor: 'pointer' }}

    >

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


function mapKpiToColumnKpi(data: Data): ColumnKpi[] {

  return data.kpis.map(kpi => ({

    kpi: kpi.name,

    value: kpi.value,

    change: 10, // Assuming you need a change value, you can calculate this accordingly

    year: data.year,

    context: kpi.context

  }));

}
export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [drawerTitle, setDrawerTitle] = useState("");
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2023");
  const [data, setData] = useState<Data | null>(null);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [selectedKpiIndex, setSelectedKpiIndex] = useState<number | null>(null);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    setData(dummyData);
    setIsSearchSubmitted(true);
    setSelectedKpiIndex(0); // Default to showing the first KPI's driver
  }


  function handleSourceClick(index: number) {
    if (data && data.kpis && data.kpis[index]) {
      setDrawerTitle(`Source [${index + 1}]`);
      setDrawerContent(data.kpis[index].context);
      setDrawerOpen(true);
    }
  }

  function handleStatClick(index: number) {
    setSelectedKpiIndex(index);
  }

  const formattedSources = data && data.kpis.map((kpi, index) => (
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
      {isSearchSubmitted && data && (
        <>
          <Heading className="mt-5" level={2}>
            IBM Annual Report
          </Heading>
          <div className="mt-3 overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {"Solid revenue growth driven by high-value offerings and productivity initiatives. Strong cash flow with significant investments in technology and acquisitions. Continued focus on hybrid cloud and AI. Strategic changes in employee benefit plans to optimize costs and provide better value."}
            </div>
          </div>
          <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {data.kpis.map((kpi, index) => (
              <Stat
                key={index}
                title={kpi.name}
                value={`$${formatNumber(kpi.value)}`}
                change={index === 0 ? "+3%" : index === 1 ? "+17%" : "-1.01%"} // This can be dynamic based on your data
                index={index}
                handleClick={handleStatClick}
                selected={selectedKpiIndex === index}
              />
            ))}
            <Stat title="EBITDA" value="$8.6B" change="+808.2%" index={-1} handleClick={handleStatClick} selected={selectedKpiIndex === -1} /> {/* Static Stat Example */}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{selectedKpiIndex !== null && data.kpis[selectedKpiIndex] ? data.kpis[selectedKpiIndex].name : "Select a KPI"}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview
                  data={selectedKpiIndex !== null ? data.kpis[selectedKpiIndex].history.map(entry => ({
                    name: entry.year.toString(),
                    total: entry.value
                  })) : []}
                />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Key Drivers</CardTitle>
                <CardDescription>
                  Events that impacted {selectedKpiIndex !== null && data.kpis[selectedKpiIndex] ? data.kpis[selectedKpiIndex].name : "EBIT"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text>
                  {selectedKpiIndex !== null && data.kpis[selectedKpiIndex] ? data.kpis[selectedKpiIndex].driver.content : "Select a KPI to view its drivers."}
                  <br />
                  <br />Sources: {formattedSources}
                </Text>
              </CardContent>
            </Card>
          </div>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={mapKpiToColumnKpi(dummyData)} />
          </div>
        </>
      )}

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerTitle}
        content={drawerContent}
      />
    </>
  );
}