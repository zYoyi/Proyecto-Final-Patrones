import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [HotelModule],
})
export class AppModule {}
