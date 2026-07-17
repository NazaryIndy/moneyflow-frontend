import { type CSSProperties, type FC } from 'react';
import { Input } from '@/shared/ui/input.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card.tsx';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field.tsx';
import { useNavigate } from 'react-router-dom';

const schema = z
  .object({
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .regex(/[A-Z]/, 'At least one uppercase letter is required"')
      .regex(/[0-9]/, 'At least one number is required"'),
    confirmPassword: z.string().min(1, 'Repeat password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormSchema = z.infer<typeof schema>;

const RegisterForm: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormSchema>({
    criteriaMode: 'all',
    delayError: 300,
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: RegisterFormSchema) {
    console.log('data', data);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Registration</CardTitle>
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
