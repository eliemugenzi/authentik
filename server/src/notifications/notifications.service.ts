import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

interface EmailPayload {
  email: string;
  subject: string;
  message: string;
}

@Injectable()
export class NotificationsService {
  constructor(private readonly http: HttpService) {}
  private readonly logger = new Logger(NotificationsService.name);

  async sendEmail(data: EmailPayload) {
    try {
      const { data: response } = await this.http.axiosRef.post(
        `${process.env.EMAIL_API_BASE_URL}/email/send`,
        {
          to_email: data.email,
          to_name: data.email,
          subject: data.subject,
          message: data.message,
          sender_name: 'Authentik',
          sender_email: 'no-reply@authentik.io',
        },
      );

      this.logger.log(response);
    } catch (error) {
      this.logger.error(error);
      console.error(error);
    }
  }
}
