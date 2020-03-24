import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyconfigModule } from  'nestjs-easyconfig';

@Module({
  imports: [EasyconfigModule.register({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
