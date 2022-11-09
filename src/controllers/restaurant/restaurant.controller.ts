import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import Location from 'src/interfaces/location.interface';
import { Restaurant } from 'src/models/restaurant.model';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async insertRestaurant(@Body() restaurant: Restaurant) {
    return await this.restaurantService.insertRestaurant(
      restaurant,
    );
  }

  @Get()
  async getRestaurants(@Query() params: any) {
    return await this.restaurantService.getRestaurants(params);
  }

  @Get('id/:id')
  async getRestaurantDetailsById(@Param('id') id: string) {
    return await this.restaurantService.getRestaurantDetailsById(id);
  }

  @Get('uniqueName/:uniqueName')
  async getRestaurantDetailsByUniqueName(@Param('uniqueName') uniqueName: string) {
    return await this.restaurantService.getRestaurantDetailsByUniqueName(uniqueName);
  }

  @Post('nearme')
  async getNearbyRestaurants(@Body('location') location: Location) {
    return await this.restaurantService.getNearbyRestaurants(
      location,
    );
  }
}
