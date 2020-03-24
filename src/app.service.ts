import { Injectable } from '@nestjs/common';
import { CodeDetailsDto } from './dto/code-details.dto';
import { EasyconfigService } from 'nestjs-easyconfig';

@Injectable()
export class AppService {
  constructor (private config: EasyconfigService) {}

  compileCode(codeDetails : CodeDetailsDto) {
    // Fetch code file from S3 bucket
    return this.config.get('DATABASE_USER');
  }
}
