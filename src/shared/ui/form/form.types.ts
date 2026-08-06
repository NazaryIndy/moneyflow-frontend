import type { Control, FieldValues, Path } from 'react-hook-form';

export type FormFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
};

export type SelectOption = {
  value: string;
  label: string;
};
