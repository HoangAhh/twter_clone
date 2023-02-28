import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class postDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  topic: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tweet: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  describe: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  like: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  view: number;
}
