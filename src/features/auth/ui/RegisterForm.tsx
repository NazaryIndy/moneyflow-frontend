import { type CSSProperties, type FC } from 'react';
import { Button } from '@/shared/ui/shadcn/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { type RegisterFormData, registerSchema } from '@/features/auth/model/schemas.ts';
import { FormInputField } from '@/shared/ui/form/FormInputField.tsx';
import { AuthFormCard } from '@/features/auth/ui/AuthFormCard.tsx';

const RegisterForm: FC = () => {
  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm<RegisterFormData>({
    criteriaMode: 'all',
    delayError: 300,
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: RegisterFormData) {
    reset();
    toast('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as CSSProperties,
    });

    navigate('/login');
  }

  return (
    <AuthFormCard
      title="Registration"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <Button type="submit" variant="outline">
          Register
        </Button>
      }
    >
      <FormInputField control={control} name="name" label="Name" autoComplete="name" />
      <FormInputField
        control={control}
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
      />
      <FormInputField
        control={control}
        name="password"
        label="Password"
        type="password"
        autoComplete="off"
      />
      <FormInputField
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="off"
      />
    </AuthFormCard>
  );
};

export { RegisterForm };
