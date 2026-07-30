import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table';
import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/shared/ui';
import { cn } from '@/shared/lib/utils.ts';
import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';
import type { CurrencyType, LocaleType } from '@/shared/types';
import { formatCurrency } from '@/shared/lib';
// TODO move
interface CategoryRankingItem {
  categoryName: string;
  amount: number;
  percentage: number;
  change: number | null;
}

interface CategoryRankingProps {
  data: CategoryRankingItem[];
  type: TransactionType;
  currency: CurrencyType;
  locale: LocaleType;
}

const CategoryRanking: FC<CategoryRankingProps> = ({ data, type, currency, locale }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Ranking ({type === 'expense' ? 'Expenses' : 'Income'})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">%</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.categoryName}>
                <TableCell className="font-medium">{item.categoryName}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(item.amount, currency, locale)}
                </TableCell>
                <TableCell className="text-right">{item.percentage.toFixed(1)}%</TableCell>
                <TableCell className="text-right">
                  {item.change !== null && (
                    <Badge
                      variant="outline"
                      className={cn(
                        'font-normal',
                        item.change > 0
                          ? 'text-expense border-expense/30 bg-expense/5'
                          : item.change < 0
                            ? 'text-income border-income/30 bg-income/5'
                            : '',
                      )}
                    >
                      {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change).toFixed(1)}%
                    </Badge>
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

export { CategoryRanking };
