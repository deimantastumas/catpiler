import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyconfigModule } from  'nestjs-easyconfig';
import { ConfigService } from 'src/config/config.service';
import { StartupService } from './startup.service';
import { S3Service } from './aws/s3.service';

@Module({
  imports: [EasyconfigModule.register({})],
  controllers: [AppController],
  providers: [AppService, ConfigService, StartupService, S3Service],
})
export class AppModule {}
