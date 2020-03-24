import { Controller, Post, Body, Header } from '@nestjs/common';

import { CppService } from './cpp.service';
import { CodeDetailsDto } from '../dto/code-details.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: CppService) {}

  @Post('cpp')
  @Header('content-type', 'application/json')
  compileCode(@Body() codeDetails: CodeDetailsDto) {
    return this.appService.compileCode(codeDetails);
  }
}
