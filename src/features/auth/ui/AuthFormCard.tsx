import type { FC, SubmitEvent, ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/shadcn/card.tsx';

type AuthFormCardProps = {
  title: string;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  footer: ReactNode;
  children: ReactNode;
};

export const AuthFormCard: FC<AuthFormCardProps> = ({ title, onSubmit, footer, children }) => (
  <form onSubmit={onSubmit} className="space-y-4 min-w-md">
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      <CardFooter className="flex justify-between">{footer}</CardFooter>
    </Card>
  </form>
);
