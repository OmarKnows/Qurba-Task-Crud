import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  favoriteCuisines: {
    type: [String],
  },
});

export interface User extends mongoose.Document {
  id: string;
  fullName: string;
  favoriteCuisines: string[];
}
