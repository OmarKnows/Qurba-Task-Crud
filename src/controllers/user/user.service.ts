import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  //this function was not part of the task however was implemented for testing purposes
  async insertUser(user: User) {
    const newUser = new this.userModel({
      fullName: user.fullName,
      favoriteCuisines: user.favoriteCuisines,
      restaurants: user.restaurants,
    });
    const result = await newUser.save();
    return { message: "User successfuly inserted", id: result.id}
  }

  async getUsersByCuisine(params: any) {
    const { cuisine } = params;
    const users = await this.userModel.aggregate([
      {//this stage performas a join and adds stage a new array field "results" containing the matching documents from the joined collection "restaurants".
        $lookup: {
          from: 'restaurants',
          localField: 'restaurants',
          foreignField: '_id',
          as: 'result',
        },
      },
      {//this stage finds users with the given cuisine OR users that own a restaurant with the given cuisine
        $match: {
          $or: [
            {
              'result.cuisine': {
                $in: [`${cuisine}`],
              },
            },
            {
              favoriteCuisines: `${cuisine}`,
            },
          ],
        },
      },
      {//this stage projects only the _id and fullName of users returned from the previous stage
        $project: {
          restaurants: 0,
          result: 0,
          favoriteCuisines: 0,
          __v: 0
        },
      },
    ]);

    return users;
  }
}
