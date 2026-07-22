import { type FC, useState } from 'react';
import { Input } from '@/shared/ui/input.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field.tsx';
import { useNavigate } from 'react-router-dom';
import { type LoginFormData, loginSchema } from '@/features/auth/model/schemas.ts';
import { useLogin } from '@/features/auth/model/authStore/hooks.ts';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
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

  const goToRegister = () => {
    navigate('/registration');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-md">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Field data-invalid={!!errors.email} className="data-[invalid=true]:text-destructive">
            <FieldLabel htmlFor="form-email">Email</FieldLabel>
            <Input
              {...register('email')}
              type={'text'}
              id="form-email"
              placeholder="Email"
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
            <div className="min-h-5">{errors.email && <FieldError errors={[errors.email]} />}</div>
          </Field>
          <Field data-invalid={!!errors.password} className="data-[invalid=true]:text-destructive">
            <FieldLabel htmlFor="form-password">Password</FieldLabel>
            <Input
              {...register('password')}
              type="password"
              id="form-password"
              placeholder="Password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
            />
            <div className="min-h-5">
              {errors.password && <FieldError errors={[errors.password]} />}
            </div>
          </Field>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type={'submit'} variant={'outline'}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <Button type={'button'} variant={'outline'} onClick={() => goToRegister()}>
            Create account
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export { LoginForm };
