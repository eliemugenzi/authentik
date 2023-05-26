import { IsNotEmpty, Matches } from 'class-validator';

export class VerifyCodeDto {
  @IsNotEmpty()
  code: string;
}
