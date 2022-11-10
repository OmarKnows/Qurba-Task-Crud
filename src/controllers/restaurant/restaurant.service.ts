import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Location from 'src/models/location.class';
import { Restaurant } from 'src/models/restaurant.model';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async insertRestaurant(restaurant: Restaurant) {
    //creating the new restaurant
    const newRestaurant = new this.restaurantModel({
      name: restaurant.name,
      uniqueName: restaurant.uniqueName,
      cuisine: restaurant.cuisine,
      location: restaurant.location,
      ownerId: restaurant.ownerId,
    });
    const result = await newRestaurant.save();
    //pushing the created restaurant to the owners restaurant array
    return { message: "Restaurant successfuly inserted", id: result.id}
  }

  //for this function I decided to return only the name, uniqueName & _id based on the wording on feature 3 "list all restaurants" as opposed to feature 4 "DETAILS of a restaurant"
  async getRestaurants(params: any) {
    const { cuisine } = params;

    if (cuisine) {
      //finds all restaurants with the given cuisine if cuisine provided
      const restaurants = await this.restaurantModel
        .find({ cuisine: cuisine })
        .exec();
      return restaurants.map((restaurant) => ({
        name: restaurant.name,
        uniqueName: restaurant.uniqueName,
        id: restaurant._id
      }));
    } else {
      //returns all restaurants if no cuisine provided
      const restaurants = await this.restaurantModel.find().exec();
      return restaurants.map((restaurant) => ({
        name: restaurant.name,
        uniqueName: restaurant.uniqueName,
        id: restaurant._id
      }));
    }
  }
  
  async getRestaurantDetailsById(id: string) {
    try {
      const restaurant = await this.restaurantModel.findById(id);
      return {
        id: restaurant.id,
        name: restaurant.name,
        uniqueName: restaurant.uniqueName,
        cuisine: restaurant.cuisine,
        location: restaurant.location,
        ownerId: restaurant.ownerId,
      };
      
    } catch (error) {
      //not found exception is required here for the interceptor to return 404 because of how mongo handles an invalid id
      throw new NotFoundException(`Could not find restaurant with the ID ${id}`)
    }
  }

  async getRestaurantDetailsByUniqueName(uniqueName: string) {
    try {
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
      
     } catch (error) {
      //not found exception is required here for the interceptor to return 404 because of how mongo handles an invalid id
       throw new NotFoundException(`Could not find restaurant with the unique name ${uniqueName}`)
    }
  }
  async getNearbyRestaurants(location: Location) {
    //returns restaurants within 1000 meters of given location
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
      location: restaurant.location.coordinates
    }));
  }
}
