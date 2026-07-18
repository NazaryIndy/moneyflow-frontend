import type { FC } from 'react';
import { Button, PageContainer, PageTitle } from '@/shared/ui';

const Categories: FC = () => {
  const categories = ['Food', 'Transport', 'Salary', 'Entertainment'];

  return (
    <PageContainer>
      <PageTitle title="Categories" />
      <Button className="w-md">+ Add category</Button>

      <div className="mt-10 flex gap-3">
        {categories.map((category) => (
          <div>{category}</div>
        ))}
      </div>
    </PageContainer>
  );
};

export { Categories };
