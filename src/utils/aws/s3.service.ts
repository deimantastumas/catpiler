import { Injectable } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk';

import { ConfigService } from 'src/config/config.service';

@Injectable()
export class S3Service {
  constructor(private env: EasyconfigService, private config: ConfigService) {
    this.s3 = new AWS.S3(config.awsConfig);
  }

  private s3: AWS.S3 = new AWS.S3(this.config.awsConfig);

  public async downloadFile(
    bucketName: string,
    key: string,
  ): Promise<AWS.S3.Body> {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const fileObject: GetObjectOutput = await this.s3
      .getObject(params)
      .promise();
    return fileObject.Body.toString();
  }

  public async listObjects(
    bucketName: string,
  ): Promise<AWS.S3.ListObjectsOutput> {
    const params = {
      Bucket: bucketName,
    };
    return await this.s3.listObjects(params).promise();
  }

  public async clearBucket(bucketName: string) {
    const objectList = (await this.listObjects(bucketName)).Contents.values();
    for (const object of objectList) {
      const params = {
        Bucket: bucketName,
        Key: object.Key,
      };
      await this.s3.deleteObject(params).promise();
    }
  }
}
