import {Column} from "typeorm";

export enum DramaLanguage {
  Hindi,
  English
}

export class Drama {
  @Column()
  name: string;
  @Column()
  language: DramaLanguage;
  @Column('jsonb')
  description: any;

  constructor(name: string, language: DramaLanguage, description: any) {
    this.name = name
    this.language = language
    this.description = description
  }
}