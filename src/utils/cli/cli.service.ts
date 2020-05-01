import { CodeDetailsDto } from '../../dto/code-details.dto';
import { exec } from 'child_process';
import * as fs from 'fs-extra';

export class CLIService {
  compileCode(fileName: string, currentDir: string) {
    const targetFile = `${currentDir}/${fileName}`;
    const codeFile = `${currentDir}/${fileName}.cpp`;

    const compileCmd = `g++ -o ${targetFile} ${codeFile}`;
    return new Promise((resolve, reject) => {
      exec(compileCmd, error => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve();
      });
    });
  }

  executeCode(currentDir: string, codeDetails: CodeDetailsDto, index: number) {
    const executeCmd = `./${currentDir}/${codeDetails.filename} < ${currentDir}/${index}.in > ${currentDir}/${index}.txt`;
    return new Promise((resolve, reject) => {
      exec(executeCmd, error => {
        if (error) {
          console.log(error);
          reject();
        }
        resolve();
      });
    });
  }

  deleteFolder(currentDir: string) {
    const deleteCmd = `rm -rf ${currentDir}`;
    exec(deleteCmd, error => {
      if (error) {
        console.log(error);
      }
    });
  }

  async processCode(codeDetails: CodeDetailsDto, sessionId: string) {
    const output: string[] = [];

    // Compile the code
    const currentDir = `code/${sessionId}`;
    try {
      await this.compileCode(codeDetails.filename, currentDir);
    } catch (error) {
      console.log(error);
    }

    // Create input files
    codeDetails.stdin.forEach((stdin, index) => {
      const inputFile = `${currentDir}/${index}.in`;
      fs.writeFileSync(inputFile, stdin);
    });

    // Execute the code with stdin
    const promises = codeDetails.stdin.map((_, index) =>
      this.executeCode(currentDir, codeDetails, index),
    );
    try {
      // wait for all child_processes to be done
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }

    // Collect output files
    codeDetails.stdin.forEach(async (_, index) => {
      try {
        const data = fs.readFileSync(`${currentDir}/${index}.txt`, 'utf8');
        output.push(data);
      } catch (err) {
        console.error(err);
      }
    });

    // Delete temp directory
    this.deleteFolder(currentDir);

    // Temp console log
    output.forEach((data, index) => {
      console.log(`${index}: ${data}`);
    });
    console.log('Execution done.\n');
  }
}
