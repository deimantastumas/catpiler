import { Injectable, OnModuleInit } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
import { S3Service } from './aws/s3.service';

@Injectable()
export class StartupService implements OnModuleInit {
    constructor (private env: EasyconfigService, private s3Service: S3Service) {}
    onModuleInit() {
        if (process.env.NODE_ENV == 'dev') {
            this.s3Service.clearBucket(this.env.get('AWS_S3_BUCKET_NAME'));
        }
    }
}
