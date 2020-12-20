import {Body, Controller, Get, Post} from '@nestjs/common';
import {Drama} from "../db/entities/drama.entity";
import {DramasService} from "./dramasService";
import {Observable} from "rxjs";
import {CreateDramaDto} from "./model/createDrama.dto";

@Controller('dramas')
export class DramasController {

  constructor(
    private dramasService: DramasService,
  ) {
  }

  @Post()
  add(@Body() createDramaDto: CreateDramaDto): Observable<Drama> {
    return this.dramasService.add(createDramaDto);
  }

  @Get()
  findAll(): Observable<Drama[]> {
    return this.dramasService.findAll();
  }
}

