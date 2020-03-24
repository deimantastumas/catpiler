import { Injectable } from '@nestjs/common';
import { CodeDetailsDto } from './dto/code-details.dto';
import { EasyconfigService } from 'nestjs-easyconfig';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor (private config: EasyconfigService) {}

  compileCode(codeDetails : CodeDetailsDto) {
    // Fetch code file from S3 bucket
    const AWS_S3_BUCKET_NAME = this.config.get('AWS_S3_BUCKET_NAME');
    const fileName = codeDetails.filename;
    const targetPath = 'code/' + fileName;

    AWS.config.update({
      accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
    });
    const s3 = new AWS.S3();

    const filePath = 'source/' + codeDetails.filename;

    const downloadCode = (targetPath, bucketName, filePath) => {
      const params = {
        Bucket: bucketName,
        Key: filePath
      };
      s3.getObject(params, (err, data) => {
        if (err) throw err;
        fs.writeFileSync(targetPath, data.Body.toString());
        console.log('Code has been downloaded!');
      });
    };
    downloadCode(targetPath, AWS_S3_BUCKET_NAME, filePath);
  }
}
