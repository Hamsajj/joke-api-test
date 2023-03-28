export class Joke {
  category!: string;
  type!: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
}
