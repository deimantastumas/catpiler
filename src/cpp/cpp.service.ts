import { Injectable } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
import * as fs from 'fs';

import { ConfigService } from 'src/config/config.service';
import { S3Service } from '../utils/aws/s3.service';
import { CodeDetailsDto } from '../dto/code-details.dto';

@Injectable()
export class CppService {
  constructor(
    private env: EasyconfigService,
    private config: ConfigService,
    private s3Service: S3Service,
  ) {}

  compileCode(codeDetails: CodeDetailsDto) {
    // Fetch code file from S3 bucket
    const bucketName = this.env.get('AWS_S3_BUCKET_NAME');
    const targetPath = 'code/' + codeDetails.filename;

    const code = this.s3Service.downloadFile(bucketName, codeDetails.filepath);
    fs.writeFileSync(targetPath, code.toString());
  }
}
