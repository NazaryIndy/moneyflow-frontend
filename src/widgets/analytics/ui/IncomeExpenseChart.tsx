import type { FC } from 'react';
import type { MonthlyStatistics } from '@/entities/transaction/model/transaction.types.ts';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';

interface IncomeExpenseChartProps {
  data: MonthlyStatistics[];
  className?: string;
}

const IncomeExpenseChart: FC<IncomeExpenseChartProps> = ({ data, className }) => {
  const formattedData = data.map((item) => ({
    month: item.month,
    Income: item.income,
    Expense: item.expense,
    Savings: item.income - item.expense,
  }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Income"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#incomeGradient)"
              />
              <Area
                type="monotone"
                dataKey="Expense"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#expenseGradient)"
              />
              <Area
                type="monotone"
                dataKey="Savings"
                stroke="#3b82f6"
                fillOpacity={0.3}
                fill="#3b82f6"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
export { IncomeExpenseChart };
