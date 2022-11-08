import * as mongoose from 'mongoose';
import { Restaurant } from './restaurant.model';

export const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  favoriteCuisines: {
    type: [String],
    required: true,
  },
  restaurants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Restaurant',
  },
});

export interface User extends mongoose.Document {
  id: string;
  fullName: string;
  favoriteCuisines: string[];
  restaurants: Restaurant[];
}
