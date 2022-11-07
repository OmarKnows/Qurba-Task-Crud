import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Location from 'src/interfaces/location.interface';

import { Restaurant } from 'src/models/restaurant.model';
import { User } from 'src/models/user.model';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async insertRestaurant(
    name: string,
    uniqueName: string,
    cuisine: string,
    location: Location,
    owner: User,
  ) {
    const newRestaurant = new this.restaurantModel({
      name,
      uniqueName,
      cuisine,
      location,
      owner,
    });
    const result = await newRestaurant.save();
    return result.id as string;
  }

  async getRestaurants() {
    const restaurants = await this.restaurantModel.find().exec();
    return restaurants.map((restaurant) => ({
      name: restaurant.name,
    }));
  }

  async getRestaurantsByCuisine(cuisine: string) {
    const restaurants = await this.restaurantModel
      .find({ cuisine: cuisine })
      .exec();
    return restaurants.map((restaurant) => ({
      name: restaurant.name,
    }));
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

  //   async getRestaurantDetailsByUniqueName(uniqueName: string) {
  //     const restaurant = await this.findRestaurant(id);
  //     return {
  //       id: restaurant.id,
  //       name: restaurant.name,
  //       uniqueName: restaurant.uniqueName,
  //       cuisine: restaurant.cuisine,
  //       location: restaurant.location,
  //       owner: restaurant.owner,
  //     };
  //   }

  async getRestaurantDetailsById(id: string) {
    const restaurant = await this.findRestaurant(id);
    return {
      id: restaurant.id,
      name: restaurant.name,
      uniqueName: restaurant.uniqueName,
      cuisine: restaurant.cuisine,
      location: restaurant.location,
      owner: restaurant.owner,
    };
  }

  private async findRestaurant(id: string): Promise<Restaurant> {
    let restaurant: Restaurant | PromiseLike<Restaurant>;

    try {
      restaurant = await this.restaurantModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find restaurant.');
    }

    if (!restaurant) {
      throw new NotFoundException('Could not find restaurant.');
    }

    return restaurant;
  }
}
