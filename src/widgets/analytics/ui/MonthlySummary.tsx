import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card.tsx';
import type { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table.tsx';
import type { MonthlySummaryItem } from '@/widgets/analytics/model/analytics.types.ts';
import { formatCurrency } from '@/shared/lib';
import type { CurrencyType, LocaleType } from '@/shared/types';
import { Badge } from '@/shared/ui/Badge/badge.tsx';

interface MonthlySummaryProps {
  data: MonthlySummaryItem[];
  currency: CurrencyType;
  locale: LocaleType;
}

const MonthlySummary: FC<MonthlySummaryProps> = ({ data, currency, locale }) => {
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
                  {formatCurrency(item.income, currency, locale)}
                </TableCell>
                <TableCell className="text-right text-expense">
                  {formatCurrency(item.expense, currency, locale)}
                </TableCell>
                <TableCell className="text-right text-blue-500">
                  {formatCurrency(item.savings, currency, locale)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(item.avgTransaction, currency, locale)}
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
