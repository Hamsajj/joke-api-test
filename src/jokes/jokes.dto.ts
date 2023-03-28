import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

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
