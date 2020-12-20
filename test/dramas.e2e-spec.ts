import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {Repository} from "typeorm";
import {Drama, DramaLanguage} from "../src/db/entities/drama.entity";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('Dramas (e2e)', () => {
  let app: INestApplication;
  let dramasRepository: Repository<Drama>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dramasRepository = moduleFixture.get(getRepositoryToken(Drama));
  });

  afterAll(() => {
    app.close();
  });

  beforeEach(async () => {
    await dramasRepository.delete({});
  });

  afterEach(async () => {
    await dramasRepository.delete({});
  });

  it('Save drama', async () => {
    const result = (await request(app.getHttpServer())
      .post('/dramas')
      .send({
        "name": "drama-1",
        "language": 0,
        "description": {
          "Rating": "9"
        }
      })
      .expect(201)).body

    expect(result).toMatchObject({
      "name": "drama-1",
      "language": 0,
      "description": {
        "Rating": "9"
      }
    });
  });

  it('get all dramas', async () => {
    const drama = new Drama(
      'name',
      DramaLanguage.Hindi,
      'description'
    );
    await dramasRepository.save(drama, {});

    const result = (
      await request(app.getHttpServer())
        .get('/dramas')
        .expect(200)
    ).body;

    expect(result).toMatchObject([{
      "name": "name",
      "language": 0,
      "description": 'description'
    }]);
  });
});
