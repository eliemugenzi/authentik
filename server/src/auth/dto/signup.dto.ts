import { UserGender, UserMaritalStatus } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { mediumPassword } from 'src/helpers/password';

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
  @Matches(mediumPassword, {
    message:
      'Password should have at least 1 lowecase letter, 1 uppercase letter, 1 digit, 1 special character, and should be between 8 and 16 characters long.',
  })
  password: string;
}
