import { IsArray, IsNumber, IsString } from "class-validator";

export default class Location {
  @IsString()
  type: string;
  @IsNumber({},{each: true})
  coordinates: {
    type: number[];
  };
}
