import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import { FilmServiceModule } from './film-service/film-service.module';
import { PathUtilModule } from '@libs/utils/path-util/path-util.module';
import { ConfigureModule } from './configure/configure.module';
import { ConfigModule } from '@nestjs/config';
import { database } from './configure/configure.load';
import { DatabaseModule } from '@libs/database';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		GlobalModule,
		FilmServiceModule,
		PathUtilModule,
		ConfigureModule,
		DatabaseModule,
		ConfigModule.forRoot({
			load: [database],
			isGlobal: true,
		})
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		}
	],
})
export class AppModule { }
