import { type FC, useState } from 'react';
import { Button } from '@/shared/ui/shadcn/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { type LoginFormData, loginSchema } from '@/features/auth/model/schemas.ts';
import { useLogin } from '@/features/auth/model/authStore/hooks.ts';
import { AuthFormCard } from '@/features/auth/ui/AuthFormCard.tsx';
import { FormInputField } from '@/shared/ui';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const login = useLogin();

  const { handleSubmit, control } = useForm<LoginFormData>({
    criteriaMode: 'all',
    delayError: 300,
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: LoginFormData) {
    setIsLoading(true);

    login({
      id: 1,
      email: data.email,
      name: 'Galina',
      icon: 'https://github.com/shadcn.png',
    });

    setIsLoading(false);
    navigate('/dashboard');
  }

  return (
    <AuthFormCard
      title="Login"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <>
          <Button type="submit" variant="outline">
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/registration')}>
            Create account
          </Button>
        </>
      }
    >
      <FormInputField control={control} name="email" label="Email" autoComplete="email" />
      <FormInputField
        control={control}
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </AuthFormCard>
  );
};

export { LoginForm };
