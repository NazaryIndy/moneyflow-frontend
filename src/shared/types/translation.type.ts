export interface TranslationOptions {
  [key: string]: unknown;
}

export interface TranslationFunction {
  (key: string, options?: TranslationOptions): string;
}
