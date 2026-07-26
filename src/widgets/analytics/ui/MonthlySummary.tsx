import { Badge, Card, CardContent, CardHeader, CardTitle, Table } from '@/shared/ui';
import type { FC } from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table.tsx';
import type { MonthlySummaryItem } from '@/widgets/analytics/model/analytics.types.ts';

interface MonthlySummaryProps {
  data: MonthlySummaryItem[];
  currencySymbol?: string;
}

const MonthlySummary: FC<MonthlySummaryProps> = ({ data, currencySymbol = '$' }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Income</TableHead>
              <TableHead className="text-right">Expense</TableHead>
              <TableHead className="text-right">Savings</TableHead>
              <TableHead className="text-right">Avg Tx</TableHead>
              <TableHead className="text-right">Largest Expense</TableHead>
              <TableHead className="text-right">Largest Income</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.month}>
                <TableCell className="font-medium">{item.month}</TableCell>
                <TableCell className="text-right text-income">
                  {currencySymbol}
                  {item.income.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-expense">
                  {currencySymbol}
                  {item.expense.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-blue-500">
                  {currencySymbol}
                  {item.savings.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {currencySymbol}
                  {item.avgTransaction.toFixed(0)}
                </TableCell>
                <TableCell className="text-right">
                  {item.largestExpense ? (
                    <span>
                      {item.largestExpense.title}{' '}
                      <Badge variant="outline" className="ml-1 text-xs">
                        {item.largestExpense.categoryName}
                      </Badge>
                    </span>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {item.largestIncome ? (
                    <span>
                      {item.largestIncome.title}{' '}
                      <Badge variant="outline" className="ml-1 text-xs">
                        {item.largestIncome.categoryName}
                      </Badge>
                    </span>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { MonthlySummary };
