import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './src/app.module';
import * as yaml from 'js-yaml';

async function generateSwaggerSpec() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
  writeFileSync('./swagger-spec.yaml', yaml.dump(document));

  console.log(
    'Swagger specs generated: swagger-spec.json and swagger-spec.yaml',
  );

  await app.close();
}

generateSwaggerSpec();
