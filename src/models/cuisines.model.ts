import * as mongoose from 'mongoose';

export const CuisineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  userCuisine: {
    type: [String],
  },
  restaurantCuisine: {
    type: String,
  },
});

export class Cuisine {
  //all fields that are input by the user are validated to not be empty, to exist & to be of correct type
  id: string;
  userId: string;
  favoriteCuisines: string[];
  restaurantCuisine: string;
}
