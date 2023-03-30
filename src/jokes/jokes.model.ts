import { Expose } from 'class-transformer';

export class Joke {
  @Expose()
  category!: string;
  @Expose()
  type!: 'single' | 'twopart';
  @Expose()
  joke?: string;
  @Expose()
  setup?: string;
  @Expose()
  delivery?: string;
  id?: number;
  lang?: string;
}

export enum ANALYZE_TYPE {
  TOTAL_CHARS,
  LETTER_COUNT,
  COMMON_LETTER,
  DOMINANT_CATEGORY,
}
export class AnalyzeResult {
  @Expose()
  description!: string;
  @Expose()
  value?: string;

  type!: ANALYZE_TYPE;

  constructor(description: string, value: string, type: ANALYZE_TYPE) {
    this.description = description;
    this.value = value;
    this.type = type;
  }
}
