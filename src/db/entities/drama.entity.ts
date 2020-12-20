import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum DramaLanguage {
  Hindi,
  English
}

@Entity({name: 'dramas'})
export class Drama {
  @PrimaryGeneratedColumn()
  id: number;

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