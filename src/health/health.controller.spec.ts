import {Test, TestingModule} from '@nestjs/testing';
import {HealthController} from './health.controller';
import {HealthCheckService, TypeOrmHealthIndicator} from "@nestjs/terminus";

describe('HealthController', () => {
  let controller: HealthController;

  const mockHealthFunction = jest.fn((params) => params[0]());
  const dummyHealthCheckService = {
    check: mockHealthFunction,
  };

  const mockIndicatorFunction = jest.fn();
  const dummyTypeOrmHealthIndicator = {
    pingCheck: mockIndicatorFunction,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: dummyHealthCheckService,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: dummyTypeOrmHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should call type orm health indicator', () => {
    controller.check();

    expect(mockIndicatorFunction).toHaveBeenCalledWith('postgres');
  });
});
