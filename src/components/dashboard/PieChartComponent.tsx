// src/components/dashboard/PieChartComponent.tsx

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from '../ui/Card.tsx';

interface PieChartProps {
  data: { name: string; value: number; color: string }[];
  title: string;
}

const PieChartComponent: React.FC<PieChartProps> = ({ data, title }) => {
  const renderLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    // Hide labels if slice is tiny or placeholder slices
    if (percent < 0.05 || data[0]?.name.includes('No activity') || data[0]?.name.includes('not set')) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#f1f5f9" // slate-100
        fontSize={12}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-100 mb-4 text-center">{title}</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.95)', // slate-800
                border: '1px solid #475569', // slate-600 border
                borderRadius: '0.5rem',
                color: '#f8fafc', // text-slate-50
              }}
              itemStyle={{ color: '#f8fafc' }}
              formatter={(value, name) => {
                if (typeof name === 'string' && (name.includes('No activity') || name.includes('not set'))) {
                  return [null, null];
                }
                return [`${value} hr(s)`, 'Hours'];
              }}
            />
            <Legend
              wrapperStyle={{ color: '#cbd5e1' }} // slate-300
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PieChartComponent;
