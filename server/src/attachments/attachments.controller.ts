import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('attachments')
export class AttachmentsController {
  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}_${Math.round(
            Math.random() * 1e9,
          )}`;

          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;

          console.log('FILE NAME', filename);
          return cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      status: HttpStatus.CREATED,
      message: 'File uploaded successfully!',
      data: {
        url: `${process.env.SERVER_DOMAIN}/attachments/${file.filename}`,
      },
    };
  }

  @Get('/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), `uploads/${filename}`));
    file.pipe(res);
  }
}
