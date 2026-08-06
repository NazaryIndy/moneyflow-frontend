import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Field, FieldContent, FieldError, FieldLabel, Input } from '@/shared/ui';
import type { FormFieldProps } from '@/shared/ui/form/form.types.ts';

type FormInputFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  step?: string;
};

export function FormInputField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  step,
}: FormInputFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <FieldContent>
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          step={step}
          aria-invalid={!!error}
          {...field}
          value={field.value ?? ''}
        />
        {error && <FieldError>{error.message}</FieldError>}
      </FieldContent>
    </Field>
  );
}
