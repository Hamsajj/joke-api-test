import { IsIn, IsOptional, Max, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Joke } from './jokes.model';

export class GetJokeParamsDto {
  @IsOptional()
  @IsIn(['single', 'twopart', 'any'])
  type?: 'single' | 'twopart' | 'any';

  @IsOptional()
  @Min(5)
  @Max(10)
  @Type(() => Number)
  amount?: number;
}

export class JokeResponseParamsDto {
  category!: string;
  type!: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
}

export class ListJokeResponseParamsDto {
  @Type(() => Joke)
  @Expose()
  jokes!: Joke[];
}
