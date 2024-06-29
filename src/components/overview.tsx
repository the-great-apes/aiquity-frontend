'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
    {
        name: '2019',
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: '2020',
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: '2021',
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: '2022',
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: '2023',
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: '2024',
        total: Math.floor(Math.random() * 5000) + 1000
    },
];

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#000000                    "
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#000000                    "
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: any) => `$${value}`}
                />
                <Bar dataKey="total" fill="##000000" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}