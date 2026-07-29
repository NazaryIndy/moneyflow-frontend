import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, List } from '@/shared/ui';
import { Lightbulb } from 'lucide-react';
import type { Insight } from '@/entities/transaction/model/transaction.types.ts';

interface InsightsProps {
  insights: Insight[];
}

const Insights: FC<InsightsProps> = ({ insights }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <List
          className="space-y-2"
          data={insights}
          renderData={({ text }) => <span className="text-sm text-muted-foreground">• {text}</span>}
        />
      </CardContent>
    </Card>
  );
};

export { Insights };
