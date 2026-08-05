import { type ComponentType, lazy } from 'react';

export const lazyImport = <T extends Record<string, ComponentType>, K extends keyof T>(
  factory: () => Promise<T>,
  name: K,
) => {
  return lazy(async () => {
    const module = await factory();
    return { default: module[name] };
  });
};
