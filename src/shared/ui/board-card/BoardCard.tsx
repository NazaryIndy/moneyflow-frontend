import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card.tsx';

import { Button, Badge } from '@/shared/ui';
import type { FC } from 'react';

type BoardCardProps = {
  title: string;
};

const BoardCard: FC<BoardCardProps> = ({ title }) => {
  return (
    <Card size={'sm'} className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  );
};

export default BoardCard;
