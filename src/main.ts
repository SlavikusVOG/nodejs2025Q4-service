import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';

async function bootstrap() {
  let doc;
  const docFilePath = './doc/api.yaml';
  try {
    const file = await readFile(docFilePath);
    doc = yaml.load(file);
  } catch (error) {
    console.error('Can not load doc');
    console.error(error);
  }

  const app = await NestFactory.create(AppModule);
  if (doc) {
    SwaggerModule.setup('doc', app, doc);
  }
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
