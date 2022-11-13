import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from 'src/models/restaurant.model';
import { RestaurantController } from 'src/controllers/restaurant/restaurant.controller';
import { RestaurantService } from 'src/controllers/restaurant/restaurant.service';
import { userRestaurantSchema } from 'src/models/userRestaurant.model';
import { UserSchema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantSchema },
      { name: 'UserRestaurant', schema: userRestaurantSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
