import * as mongoose from 'mongoose';
import Location from 'src/interfaces/location.interface';
import { User } from './user.model';

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

RestaurantSchema.index({ location: '2dsphere' });
export interface Restaurant extends mongoose.Document {
  id: string;
  name: string;
  uniqueName: string;
  cuisine: string;
  location: Location;
  ownerId: string;
}
