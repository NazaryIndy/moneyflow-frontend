import { type FC, useState } from 'react';
import { PageContainer } from '@/shared/ui';
import { useCategories } from '@/entities/category/api';
import { CreateCategoryButton, CreateCategoryDialog } from '@/features/createCategory';
import { EmptyCategories } from '@/entities/category/ui/EmptyCategories.tsx';
import { CategoryCard } from '@/entities/category/ui/CategoryCard.tsx';

const Categories: FC = () => {
  const { data } = useCategories();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <PageContainer title="Categories">
      <CreateCategoryButton setOpen={setDialogOpen} />
      <CreateCategoryDialog open={dialogOpen} setOpen={setDialogOpen} />

      {data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {data.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <EmptyCategories />
      )}
    </PageContainer>
  );
};

export { Categories };
