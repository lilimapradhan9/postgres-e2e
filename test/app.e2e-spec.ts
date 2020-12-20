import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('Health (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it('Health Endpoint', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        "status": "ok",
        "info": {"postgres": {"status": "up"}},
        "error": {},
        "details": {"postgres": {"status": "up"}}
      });
  });
});
