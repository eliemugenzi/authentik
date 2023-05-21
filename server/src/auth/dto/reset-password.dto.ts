import { IsNotEmpty, Matches } from 'class-validator';
import { mediumPassword } from 'src/helpers/password';

export class ResetPasswordDto {
  @IsNotEmpty()
  @Matches(mediumPassword, {
    message:
      'Password should have at least 1 lowecase letter, 1 uppercase letter, 1 digit, 1 special character, and should be between 8 and 16 characters long.',
  })
  new_password: string;
}
