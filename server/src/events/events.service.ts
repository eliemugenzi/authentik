import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

type EmailPayload = {
  email: string;
  subject: string;
  message: string;
};

@Injectable()
export class EventsService {
  constructor(private readonly http: HttpService) {}

  private readonly logger = new Logger(EventsService.name);

  @OnEvent('send-mail')
  async sendEmail(payload: EmailPayload) {
    console.log('WHAT S UP');
    try {
      const { data: response } = await this.http.axiosRef.post(
        `${process.env.EMAIL_API_BASE_URL}/email/send`,
        {
          to_email: payload.email,
          to_name: payload.email,
          subject: payload.subject,
          message: payload.message,
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
