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
import type { IconType } from '@/shared/config/types.ts';

type StatsCardProps = {
  title: string;
  value: number;
  icon: IconType;
  tag: string;
};

const StatsCard: FC<StatsCardProps> = ({ title, value, icon, tag }) => {
  const Icon = icon;

  return (
    <Card size={'sm'} className="relative mx-auto w-full max-w-sm pt-0">
      <Icon className="mt-3 w-full object-cover" />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{tag}</Badge>
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
