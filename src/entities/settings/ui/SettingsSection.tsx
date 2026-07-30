import type { FC, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

type SettingsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const SettingsSection: FC<SettingsSectionProps> = ({ title, description, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
};

export { SettingsSection };
