import { Injectable } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
import * as AWS from 'aws-sdk';

@Injectable()
export class ConfigService {
  constructor(private config: EasyconfigService) {
    this._awsConfig = new AWS.Config({
      accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  private _awsConfig: AWS.Config;

  get awsConfig(): AWS.Config {
    return this._awsConfig;
  }
}
