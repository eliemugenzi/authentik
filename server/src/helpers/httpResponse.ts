import { HttpStatus } from '@nestjs/common';

export interface HttpResponse {
  status: HttpStatus;
  data?: any;
  message?: string;
  meta?: {
    total: number;
    page: number;
    pages: number;
  };
  timestamp: string | Date;
}

interface IResponseData {
  status: HttpStatus;
  data?: any;
  meta?: {
    total: number;
    page: number;
    pages: number;
  };
  message?: string;
}

const httpResponse = (data: IResponseData): HttpResponse => ({
  ...data,
  timestamp: new Date().toISOString(),
});

export default httpResponse;
