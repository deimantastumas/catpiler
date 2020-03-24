import { Injectable } from "@nestjs/common";
import { EasyconfigService } from 'nestjs-easyconfig';
import * as AWS from 'aws-sdk';

@Injectable()
export class ConfigService {
    awsConfig: AWS.Config;

    constructor(private config: EasyconfigService) {
        this.awsConfig = new AWS.Config({
            accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
        })
    }
}