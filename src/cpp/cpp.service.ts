import { Injectable } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
import * as fs from 'fs-extra';
import { v4 as uuid } from 'uuid';

import { ConfigService } from 'src/config/config.service';
import { S3Service } from '../utils/aws/s3.service';
import { CodeDetailsDto } from '../dto/code-details.dto';
import { CLIService } from 'src/utils/cli/cli.service';

@Injectable()
export class CppService {
  constructor(
    private env: EasyconfigService,
    private config: ConfigService,
    private s3Service: S3Service,
    private cliService: CLIService,
  ) {}

  async evaluateCode(codeDetails: CodeDetailsDto): Promise<number> {
    // Fetch code file from S3 bucket
    const bucketName = this.env.get('AWS_S3_BUCKET_NAME');
    let codeContent: AWS.S3.Body;

    const sessionId = uuid();
    const downloadPath = `code/${sessionId}`;

    try {
      codeContent = await this.s3Service.downloadFile(
        bucketName,
        codeDetails.filepath,
      );
    } catch (error) {
      console.log(error);
    }
    fs.mkdirs(downloadPath)
      .then(() => {
        fs.writeFileSync(
          `${downloadPath}/${codeDetails.filename}.cpp`,
          codeContent.toString(),
        );
      })
      .catch(function(error) {
        console.log(error);
      });

    // Compile and execute the code with stdin
    const output: string[] = await this.cliService.processCode(
      codeDetails,
      sessionId,
    );

    // Compare expected and true results
    let passedTests = 0;
    output.forEach((data, index) => {
      if (data == codeDetails.stdout[index]) passedTests++;
    });

    return passedTests;
  }
}
