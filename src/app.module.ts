import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './modules/restaurant.module';
import { UserModule } from './modules/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { allExceptionsFilter } from './allExceptions.filter';

@Module({
  imports: [
    RestaurantModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: allExceptionsFilter,
    },
  ],
})
export class AppModule {}
