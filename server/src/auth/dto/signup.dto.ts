import { UserGender, UserMaritalStatus } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SignUpDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birth_date: Date;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsNotEmpty()
  @IsEnum(UserMaritalStatus)
  marital_status: UserMaritalStatus;

  @IsNotEmpty()
  password: string;
}
