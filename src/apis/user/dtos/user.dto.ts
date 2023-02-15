import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  example1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  example2: string;
}
