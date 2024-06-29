type Kpi = {
    kpi: string
    value: number
    change: number
    year: number
    context: string
}

export const payments: Kpi[] = [
    {
        kpi: "728ed52f",
        value: 100,
        change: 99,
        year: 2024,
        context: "this is context"
    },
    {
        kpi: "728ed52f",
        value: 12300,
        change: 12,
        year: 2024,
        context: "this is context"
    },
    // ...
]
