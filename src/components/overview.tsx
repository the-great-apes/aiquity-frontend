import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Sample usage:
// <Overview data={[{ name: '2019', total: 3000 }, { name: '2020', total: 4200 }]} />

export function Overview({ data }: any) {
    // Formatting function to shorten large numbers
    const formatNumber = (value: number) => {
        if (value >= 1_000_000_000) {
            return `$${(value / 1_000_000_000).toFixed(1)}B`;
        } else if (value >= 1_000_000) {
            return `$${(value / 1_000_000).toFixed(1)}M`;
        } else if (value >= 1_000) {
            return `$${(value / 1_000).toFixed(1)}K`;
        } else {
            return `$${value}`;
        }
    };

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#000000"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#000000"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatNumber}
                />
                <Bar dataKey="total" fill="#000000" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}