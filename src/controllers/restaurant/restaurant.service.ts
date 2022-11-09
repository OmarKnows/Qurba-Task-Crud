import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import Location from 'src/interfaces/location.interface';
import { Restaurant } from 'src/models/restaurant.model';
import { User } from 'src/models/user.model';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async insertRestaurant(restaurant: Restaurant) {
    const newRestaurant = new this.restaurantModel({
      name: restaurant.name,
      uniqueName: restaurant.uniqueName,
      cuisine: restaurant.cuisine,
      location: restaurant.location,
      ownerId: restaurant.ownerId,
    });
    const result = await newRestaurant.save();
    const owner = await this.userModel.findById(restaurant.ownerId)
    owner.restaurants.push(newRestaurant)
    await owner.save();
    return { message: "Restaurant successfuly inserted", id: result.id}
  }

  async getRestaurants(params: any) {
    const { cuisine } = params;

    if (cuisine) {
      const restaurants = await this.restaurantModel
        .find({ cuisine: cuisine })
        .exec();
      return restaurants.map((restaurant) => ({
        name: restaurant.name,
        uniqueName: restaurant.uniqueName,
        id: restaurant._id
      }));
    } else {
      const restaurants = await this.restaurantModel.find().exec();
      return restaurants.map((restaurant) => ({
        name: restaurant.name,
        uniqueName: restaurant.uniqueName,
        id: restaurant._id
      }));
    }
  }

  async getNearbyRestaurants(location: Location) {
    const restaurants = await this.restaurantModel.find({
      location: {
        $near: {
          $geometry: { type: location.type, coordinates: location.coordinates },
          $maxDistance: 1000,
        },
      },
    });
    return restaurants.map((restaurant) => ({
      name: restaurant.name,
    }));
  }

  async getRestaurantDetails(params: any) {
    const { id, uniqueName } = params;
    let restaurant: Document<unknown, any, Restaurant> & Restaurant & { _id: Types.ObjectId; };
    try {
      if (id) restaurant = await this.restaurantModel.findById(id);
      else if (uniqueName)
        restaurant = await this.restaurantModel.findOne({
          uniqueName: uniqueName,
        });
      return {
        id: restaurant.id,
        name: restaurant.name,
        uniqueName: restaurant.uniqueName,
        cuisine: restaurant.cuisine,
        location: restaurant.location,
        ownerId: restaurant.ownerId,
      };
      
    } catch (error) {
      throw new NotFoundException
    }
  }
}
