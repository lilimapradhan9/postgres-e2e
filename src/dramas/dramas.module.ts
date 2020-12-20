import {Module} from '@nestjs/common';
import {DramasController} from './dramas.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Drama} from "../db/entities/drama.entity";
import {DramasService} from "./dramasService";

@Module({
  imports: [TypeOrmModule.forFeature([Drama])],
  controllers: [DramasController],
  providers: [DramasService]
})
export class DramasModule {
}
