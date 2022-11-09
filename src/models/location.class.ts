import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

//class for the GeoJSON object
export default class Location {
  @IsString()
  @ApiProperty({ type: String })
  type: string;
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  coordinates: {
    type: number[];
  };
}
