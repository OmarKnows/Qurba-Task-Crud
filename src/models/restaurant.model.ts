import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import * as mongoose from 'mongoose';
import Location from 'src/models/location.class';

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
  //location is implemented using GeoJSON objects
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
  //each restaurant is required to have an owner of type User, this is a ref to the user model
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

//uniqueName, cuisine & location are indexed because these are the fields that have queries performed on them
//note: cannot perform geospatial queries on a location without indexing it first.
RestaurantSchema.index({ uniqueName: 1 });
RestaurantSchema.index({ cuisine: 1 });
RestaurantSchema.index({ location: '2dsphere' });

export class Restaurant {
  //all fields that are input by the user are validated to not be empty, to exist & to be of correct type
  id: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  uniqueName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  cuisine: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Location)
  @ApiProperty({ type: Location })
  location: Location;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  ownerId: string;
}
