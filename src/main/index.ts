import { NestFactory } from '@nestjs/core';
import { app } from 'electron';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ElectronIpcTransport } from './transport';
import { AppModule } from './app.module';

async function bootstrap() {
    try {
        const zmautoApp = await NestFactory.create(AppModule);
        zmautoApp.connectMicroservice<MicroserviceOptions>({ strategy: new ElectronIpcTransport });
        await zmautoApp.startAllMicroservices();
        await zmautoApp.listen(3030);
    } catch (error) {
        console.log(error);
        app.quit();
    }
}

bootstrap();

