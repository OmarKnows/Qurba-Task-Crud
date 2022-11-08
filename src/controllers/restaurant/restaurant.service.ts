import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Location from 'src/interfaces/location.interface';
import { Restaurant } from 'src/models/restaurant.model';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
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
    return result.id as string;
  }

  async getRestaurants(params: any) {
    const { cuisine } = params;

    if (cuisine) {
      const restaurants = await this.restaurantModel
        .find({ cuisine: cuisine })
        .exec();
      return restaurants.map((restaurant) => ({
        name: restaurant.name,
      }));
    } else {
      const restaurants = await this.restaurantModel.find().exec();
      return restaurants.map((restaurant) => ({
        name: restaurant.name,
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

  async getRestaurantDetailsByUniqueName(uniqueName: string) {
    const restaurant = await this.restaurantModel.findOne({
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
  }

  async getRestaurantDetails(params: any) {
    const { id, uniqueName } = params;
    var restaurant;

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
  }
}
