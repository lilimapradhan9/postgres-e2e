import {DramaLanguage} from "../../db/entities/drama.entity";

export class CreateDramaDto {
  name: string;
  language: DramaLanguage;
  description: any;
}