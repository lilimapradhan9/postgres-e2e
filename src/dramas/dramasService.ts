import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Drama} from "./entity/drama.entity";
import {Repository} from "typeorm";
import {from, Observable} from "rxjs";
import {CreateDramaDto} from "./model/createDrama.dto";

@Injectable()
export class DramasService {

  constructor(
    @InjectRepository(Drama)
    private dramasRepository: Repository<Drama>,
  ) {
  }


  add(drama: CreateDramaDto): Observable<Drama> {
    return from(this.dramasRepository.save(drama));
  }

  findAll(): Observable<Drama[]> {
    return from(this.dramasRepository.find());
  }
}
