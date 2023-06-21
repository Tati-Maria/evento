'use client';

import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const data = [
    {
        name: "Jan",
        totalAtendees: 400,
    },
    {
        name: "Feb",
        totalAtendees: 300,
    },
    {
        name: "Mar",
        totalAtendees: 300,
    },
    {
        name: "Apr",
        totalAtendees: 200,
    },
    {
        name: "May",
        totalAtendees: 278,
    },
    {
        name: "Jun",
        totalAtendees: 189,
    },
    {
        name: "Jul",
        totalAtendees: 239,
    },
    {
        name: "Aug",
        totalAtendees: 349,
    },
    {
        name: "Sep",
        totalAtendees: 200,
    },
    {
        name: "Oct",
        totalAtendees: 278,
    },
    {
        name: "Nov",
        totalAtendees: 189,
    },
    {
        name: "Dec",
        totalAtendees: 239,
    }
];

export function EventAtendeesChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis 
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                fontSize={12} 
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}k`}
                />
                <Bar 
                fill='#FF37A6'
                dataKey={"totalAtendees"} 
                radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}