import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import Location from 'src/models/location.class';
import { Restaurant } from 'src/models/restaurant.model';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  //posts a new restaurant to database
  @Post()
  @ApiTags('restaurant')
  @ApiCreatedResponse({ description: 'Insert new restaurant' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async insertRestaurant(@Body() restaurant: Restaurant) {
    return await this.restaurantService.insertRestaurant(restaurant);
  }

  //gets all restaurants, can optionally filter by cuisine using query param
  @Get()
  @ApiTags('restaurant')
  @ApiQuery({ name: 'cuisine', required: false })
  @ApiOkResponse({
    description: 'Gets all restaurants, optionally filter by cuisine',
  })
  async getRestaurants(@Query() cuisine: any) {
    return await this.restaurantService.getRestaurants(cuisine);
  }

  //gets all the details of a single restaurant given its id
  @Get('id/:id')
  @ApiTags('restaurant')
  @ApiOkResponse({
    description: 'Gets all the details of a single restaurant given its id',
  })
  @ApiNotFoundResponse({
    description: 'No restaurant found with the given id',
  })
  async getRestaurantDetailsById(@Param('id') id: string) {
    return await this.restaurantService.getRestaurantDetailsById(id);
  }

  //gets all the details of a single restaurant given its uniqueName
  @Get('uniqueName/:uniqueName')
  @ApiTags('restaurant')
  @ApiOkResponse({
    description:
      'Gets all the details of a single restaurant given its uniqueName',
  })
  @ApiNotFoundResponse({
    description: 'No restaurant found with the given uniqueName',
  })
  async getRestaurantDetailsByUniqueName(
    @Param('uniqueName') uniqueName: string,
  ) {
    return await this.restaurantService.getRestaurantDetailsByUniqueName(
      uniqueName,
    );
  }

  //posts a GeoJSON object (a location) and returns a list of restaurants and their locations near the given location
  @Post('nearme')
  @ApiTags('restaurant')
  @ApiCreatedResponse({
    description:
      'Posts a GeoJSON object (a location) and returns a list of restaurants and their locations near the given location',
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async getNearbyRestaurants(@Body() location: Location) {
    return await this.restaurantService.getNearbyRestaurants(location);
  }
}
