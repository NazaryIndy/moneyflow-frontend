import { type CSSProperties, type FC, useState } from 'react';
import { Input } from '@/shared/ui/input.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field.tsx';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/features/auth/model/schemas.ts';

type LoginFormSchema = z.infer<typeof loginSchema>;

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    criteriaMode: 'all',
    delayError: 300,
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: LoginFormSchema) {
    setIsLoading(true);
    console.log('data', data);
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
