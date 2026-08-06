import { type CSSProperties, type FC } from 'react';
import { Input } from '@/shared/ui/shadcn/input.tsx';
import { Button } from '@/shared/ui/shadcn/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/shadcn/card.tsx';
import { Field, FieldError, FieldLabel } from '@/shared/ui/shadcn/field.tsx';
import { useNavigate } from 'react-router-dom';
import { type RegisterFormData, registerSchema } from '@/features/auth/model/schemas.ts';

const RegisterForm: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-md">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <Field data-invalid={!!errors.name} className="data-[invalid=true]:text-destructive">
            <FieldLabel htmlFor="form-name">Name</FieldLabel>
            <Input
              {...register('name')}
              type={'text'}
              id="form-name"
              placeholder="Name"
              autoComplete="name"
              aria-invalid={!!errors.name}
            />
            <div className="min-h-5">{errors.name && <FieldError errors={[errors.name]} />}</div>
          </Field>

          <Field data-invalid={!!errors.email} className="data-[invalid=true]:text-destructive">
            <FieldLabel htmlFor="form-email">Email</FieldLabel>
            <Input
              {...register('email')}
              type={'email'}
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
              autoComplete="off"
              aria-invalid={!!errors.password}
            />
            <div className="min-h-5">
              {errors.password && <FieldError errors={[errors.password]} />}
            </div>
          </Field>
          <Field
            data-invalid={!!errors.confirmPassword}
            className="data-[invalid=true]:text-destructive"
          >
            <FieldLabel htmlFor="form-confirmPassword">Confirm Password</FieldLabel>
            <Input
              {...register('confirmPassword')}
              type="password"
              id="form-confirmPassword"
              placeholder="Password"
              autoComplete="off"
              aria-invalid={!!errors.password}
            />
            <div className="min-h-5">
              {errors.confirmPassword && <FieldError errors={[errors.confirmPassword]} />}
            </div>
          </Field>
        </CardContent>
        <CardFooter>
          <Button type={'submit'} variant={'outline'}>
            Register
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export { RegisterForm };
