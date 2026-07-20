import type { FC } from 'react';
import { Button, PageContainer } from '@/shared/ui';
import { PlusIcon } from 'lucide-react';

const Categories: FC = () => {
  const categories = ['Food', 'Transport', 'Salary', 'Entertainment'];

  return (
    <PageContainer title="Categories" className="flex flex-col gap-10 flex-wrap">
      <Button>
        <PlusIcon /> Add category
      </Button>

      <div className="mt-10 flex gap-3">
        {categories.map((category) => (
          <div>{category}</div>
        ))}
      </div>
    </PageContainer>
  );
};

export { Categories };
