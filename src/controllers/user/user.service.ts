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

  async getUsersByCuisine(params: any) {
    const { cuisine } = params;
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'restaurants',
          localField: 'restaurants',
          foreignField: '_id',
          as: 'result',
        },
      },
      {
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
      {
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
