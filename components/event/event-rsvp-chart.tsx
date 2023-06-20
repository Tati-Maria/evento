'use client';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Yes', value: 400 },
    { name: 'No', value: 300 },
    { name: 'Maybe', value: 300 },
]

const COLORS = ["#D90368", "#00CC66", "#FFC300"];
const RADIAN = Math.PI / 180;

const EventRsvpChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                    <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                    >
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                    );
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventRsvpChart;
