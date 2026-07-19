import type { FC } from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card.tsx';
import { Badge, Button } from '@/shared/ui';
import type { IconType } from '@/shared/types';

type StatsCardProps = {
  title: string;
  value: number;
  icon: IconType;
  tag: string;
  color: 'red' | 'green' | 'blue' | 'purple';
};

const StatsCard: FC<StatsCardProps> = ({ title, value, icon, tag, color }) => {
  const Icon = icon;
  let badgeColor;
  if (color === 'red') {
    badgeColor = 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300';
  }
  if (color === 'green') {
    badgeColor = 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300';
  }
  if (color === 'blue') {
    badgeColor = 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
  }
  if (color === 'purple') {
    badgeColor = 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
  }

  return (
    <Card size={'sm'} className="relative mx-auto w-full max-w-sm pt-0">
      <Icon className="mt-3 w-full object-cover" />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary" className={badgeColor}>
            {tag}
          </Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>${value}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View History</Button>
      </CardFooter>
    </Card>
  );
};

export { StatsCard };
