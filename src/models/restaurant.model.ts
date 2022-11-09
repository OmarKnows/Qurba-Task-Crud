import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import * as mongoose from 'mongoose';
import Location from 'src/interfaces/location.interface';

export const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueName: {
    type: String,
    unique: true,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point', 'Polygon'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

RestaurantSchema.index({ uniqueName: 1})
RestaurantSchema.index({ cuisine: 1})
RestaurantSchema.index({ location: '2dsphere' });

export class Restaurant {
  id: string;
  @IsNotEmpty() @IsString()
  name: string;
  @IsNotEmpty() @IsString()
  uniqueName: string;
  @IsNotEmpty() @IsString()
  cuisine: string;
  @IsNotEmpty() @ValidateNested()
  @Type(() => Location)
  location: Location;
  @IsNotEmpty() @IsString()
  ownerId: string;
}
