export interface Joke {
  category: string;
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
}


export interface JokeAnalyzes {
  description?: string;
  value?: string;
}