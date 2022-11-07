import * as mongoose from 'mongoose';
import { User } from './user.model';

export const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueName: {
    type: String,
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
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export interface Restaurant extends mongoose.Document {
  id: string;
  name: string;
  uniqueName: string;
  cuisine: string;
  location: {
    type: string;
    coordinates: {
      type: number[];
    };
  };
  owner: User;
}
