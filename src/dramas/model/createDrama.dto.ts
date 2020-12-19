import {DramaLanguage} from "../entity/drama.entity";

export class CreateDramaDto {
  name: string;
  language: DramaLanguage;
  description: any;
}