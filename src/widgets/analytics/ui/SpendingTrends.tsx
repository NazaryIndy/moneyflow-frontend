import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartPoint = Record<string, string | number>;

interface SpendingTrendsProps {
  data: { categoryName: string; color: string; data: { month: string; amount: number }[] }[];
}

const SpendingTrends: FC<SpendingTrendsProps> = ({ data }) => {
  const allMonths = Array.from(new Set(data.flatMap((c) => c.data.map((d) => d.month)))).sort();
  const chartData: ChartPoint[] = allMonths.map((month) => {
    const point: ChartPoint = { month };
    data.forEach((cat) => {
      const found = cat.data.find((d) => d.month === month);
      point[cat.categoryName] = found ? found.amount : 0;
    });
    return point;
  });

  const colors = data.reduce(
    (acc, cat) => {
      acc[cat.categoryName] = cat.color;
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.map((cat) => (
                <Line
                  key={cat.categoryName}
                  type="monotone"
                  dataKey={cat.categoryName}
                  stroke={colors[cat.categoryName] || '#888888'}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export { SpendingTrends };
