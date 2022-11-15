import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { UserRestaurant } from 'src/models/userRestaurant.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('UserRestaurant')
    private readonly userRestaurantModel: Model<UserRestaurant>,
  ) {}

  //this function was not part of the task however was implemented for testing purposes
  async insertUser(user: User) {
    const newUser = new this.userModel({
      fullName: user.fullName,
      favoriteCuisines: user.favoriteCuisines,
    });
    const result = await newUser.save();

    return { message: 'User successfuly inserted', id: result.id };
  }

  async getUsersByCuisine(params: any) {
    const { cuisine } = params;
    const users = await this.userRestaurantModel.aggregate([
      {
        //this stage searches the userRestaurant collection for any all documents with restaurant cuisine 'cuisine' OR user's favorite cuisine 'cuisine'
        $match: {
          $or: [
            {
              restaurantCuisine: `${cuisine}`,
            },
            {
              userFavoriteCuisines: `${cuisine}`,
            },
          ],
        },
      },
      {
        //this lookup then populates the documents of the previous state using the ref to User collection 'userId'
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'Users',
        },
      },
      {
        //projects the userId & user fullname, structure of the schema could have been better though
        $project: {
          _id: 0,
          userId: 1,
          Users: {
            fullName: 1,
          },
        },
      },
    ]);

    return users;
  }
}
