import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  type FormFieldProps,
  Select,
  SelectContent,
  SelectItem,
  type SelectOption,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

type FormSelectFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  options: SelectOption[];
  placeholder?: string;
  valueType?: 'string' | 'number';
};

export function FormSelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  valueType = 'string',
}: FormSelectFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const selectValue =
    valueType === 'number' ? (field.value == null ? undefined : String(field.value)) : field.value;

  const handleValueChange = (value: string) => {
    field.onChange(valueType === 'number' ? Number(value) : value);
  };

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <FieldContent>
        <Select value={selectValue} onValueChange={handleValueChange}>
          <SelectTrigger id={name} aria-invalid={!!error}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <FieldError>{error.message}</FieldError>}
      </FieldContent>
    </Field>
  );
}
