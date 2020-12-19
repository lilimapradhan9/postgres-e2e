import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DramasModule } from './dramas/dramas.module';
import { DramasService } from './dramas/dramasService';

@Module({
  imports: [DramasModule],
  controllers: [AppController],
  providers: [AppService, DramasService],
})
export class AppModule {}
