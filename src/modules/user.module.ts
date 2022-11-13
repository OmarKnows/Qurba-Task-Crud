import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/controllers/user/user.service';
import { userRestaurantSchema } from 'src/models/userRestaurant.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{ name: 'UserRestaurant', schema: userRestaurantSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
