import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class postDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  contents: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantityLikes: number;
}
