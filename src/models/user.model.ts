import { IsString, IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { Restaurant } from './restaurant.model';
import { ApiProperty } from '@nestjs/swagger';

export const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  favoriteCuisines: {
    type: [String],
    required: true,
  },
  //array of restaurant id's representing the id of the restaurants owned by the user if any
  restaurants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Restaurant',
  },
});

export class User {
  //all fields that are input by the user are validated to not be empty, to exist & to be of correct type
  @ApiProperty({ type: String })
  id: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  fullName: string;
  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ type: Array<string> })
  favoriteCuisines: string[];
  @ApiProperty({ type: [String], required: false })
  restaurants: Restaurant[];
}
