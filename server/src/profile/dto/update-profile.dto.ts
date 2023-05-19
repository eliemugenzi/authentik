import { UserGender, UserMaritalStatus } from '@prisma/client';

export class UpdateProfileDto {
  first_name: string;
  last_name: string;
  email: string;
  nationality: string;
  marital_status: UserMaritalStatus;
  gender: UserGender;
  identification_document: string;
  avatar: string;
}
