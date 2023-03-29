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
