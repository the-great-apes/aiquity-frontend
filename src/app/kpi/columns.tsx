"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Kpi = {
    kpi: string
    value: number
    change: number
    year: number
    context: string
}

export const columns: ColumnDef<Kpi>[] = [
    {
        accessorKey: "kpi",
        header: "KPI",
    },
    {
        accessorKey: "value",
        header: () => <div className="text-right">Value</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("value"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "change",
        header: "Change",
        cell: ({ row }) => {
            const change = row.getValue("change") as number
            return <div>{change}%</div>
        },
    },
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "context",
        header: "Context",
    },
]
