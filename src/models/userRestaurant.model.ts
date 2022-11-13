import * as mongoose from 'mongoose';

export const userRestaurantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  userFavoriteCuisines: {
    type: [String],
  },
  restaurantCuisine: {
    type: String,
  }
});

export interface UserRestaurant {
  id?: string;
  userId: mongoose.Types.ObjectId,
  userFavoriteCuisines?: string[];
  restaurantCuisine: string
}
