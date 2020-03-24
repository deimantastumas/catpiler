import { Module } from '@nestjs/common';
import { EasyconfigModule } from  'nestjs-easyconfig';

import { ConfigService } from 'src/config/config.service';
import { AppController } from './cpp/cpp.controller';
import { CppService } from './cpp/cpp.service';
import { S3Service } from './utils/aws/s3.service';

@Module({
  imports: [EasyconfigModule.register({})],
  controllers: [AppController],
  providers: [CppService, ConfigService, S3Service],
})
export class AppModule {}
