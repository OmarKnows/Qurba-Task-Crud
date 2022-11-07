import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import Location from 'src/interfaces/location.interface';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async insertRestaurant(
    @Body('name') name: string,
    @Body('uniqueName') uniqueName: string,
    @Body('cuisine') cuisine: string,
    @Body('location') location: Location,
    @Body('ownerId') ownerId: string,
  ) {
    const generatedId = await this.restaurantService.insertRestaurant(
      name,
      uniqueName,
      cuisine,
      location,
      ownerId,
    );
    return { id: generatedId };
  }

  @Get()
  async getRestaurants() {
    const restaurants = await this.restaurantService.getRestaurants();
    return restaurants;
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: string) {
    return await this.restaurantService.getRestaurantDetailsById(id);
  }

  @Post('nearme')
  async getNearbyRestaurants(@Body('location') location: Location) {
    const restaurants = await this.restaurantService.getNearbyRestaurants(
      location,
    );
    return restaurants;
  }
}
