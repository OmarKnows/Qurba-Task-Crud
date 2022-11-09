import { Controller, Post, Body, Get, Query } from '@nestjs/common';
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

  @Get('details')
  async getRestaurantById(@Query() params: any) {
    return await this.restaurantService.getRestaurantDetails(params);
  }

  @Post('nearme')
  async getNearbyRestaurants(@Body('location') location: Location) {
    return await this.restaurantService.getNearbyRestaurants(
      location,
    );
  }
}
