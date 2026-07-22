import type { CurrencyType } from '@/entities/transaction/model/transaction.types.ts';

export const getCurrencySimbol = (currency: CurrencyType) => {
  return currency === 'dollar' ? '$' : currency === 'euro' ? '€' : '₽';
};
export const formatNumbers = (amount: number) => {
  return amount.toLocaleString('ru-RU');
};
export const formatDate = () => {};
export const formatPercent = () => {};
