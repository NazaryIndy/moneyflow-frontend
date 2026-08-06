import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import type { FC } from 'react';
import { Pie, ResponsiveContainer, Tooltip, PieChart } from 'recharts';
import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

// TODO interface
interface CategoryBreakdownProps {
  data: { categoryName: string; total: number; color?: string }[];
  type: TransactionType;
  onTypeChange: () => void;
  className?: string;
}

const CategoryBreakdown: FC<CategoryBreakdownProps> = ({ data, type, onTypeChange, className }) => {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Category Breakdown</CardTitle>
          <Button variant="outline" size="sm" onClick={onTypeChange}>
            Show {type === TRANSACTION_TYPE.EXPENSE ? 'Income' : 'Expenses'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No data available for {type}
          </div>
        </CardContent>
      </Card>
    );
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);

  if (total === 0) {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Category Breakdown</CardTitle>
          <Button variant="outline" size="sm" onClick={onTypeChange}>
            Show {type === TRANSACTION_TYPE.EXPENSE ? 'Income' : 'Expenses'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No {type} transactions yet
          </div>
        </CardContent>
      </Card>
    );
  }

  // TODO calculatePercentage

  const withColor = data.map((item) => ({
    ...item,
    fill: item.color || '#888888',
    percentage: (item.total / total) * 100,
  }));

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Category Breakdown</CardTitle>
        <Button variant="outline" size="sm" onClick={onTypeChange}>
          Show {type === TRANSACTION_TYPE.EXPENSE ? 'Income' : 'Expenses'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={withColor}
                nameKey="categoryName"
                dataKey="total"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                label={({ name, percent }) => {
                  if (percent === undefined) return name;
                  return `${name} ${(percent * 100).toFixed(0)}%`;
                }}
                labelLine={false}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export { CategoryBreakdown };
