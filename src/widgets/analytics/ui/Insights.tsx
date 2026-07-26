import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { Lightbulb } from 'lucide-react';

interface InsightsProps {
  insights: string[];
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
        <ul className="space-y-2">
          {insights.map((text, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              • {text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export { Insights };
