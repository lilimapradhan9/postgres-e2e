import {Test, TestingModule} from '@nestjs/testing';
import {DramasController} from './dramas.controller';
import {DramasService} from './dramasService';
import {Drama, DramaLanguage} from './entity/drama.entity';

describe('Dramas Controller', () => {
  let controller: DramasController;
  const drama = new Drama('Some drama', DramaLanguage.Hindi, '');
  const dramaList = [drama];
  const mockAddDramaFunction = jest.fn(() => drama);
  const mockGetDramasFunction = jest.fn(() => dramaList);

  beforeEach(async () => {
    const dummyService = {
      add: mockAddDramaFunction,
      findAll: mockGetDramasFunction,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DramasController],
      providers: [
        {
          provide: DramasService,
          useValue: dummyService,
        },
      ],
    }).compile();

    controller = module.get<DramasController>(DramasController);
  });

  it('should return saved drama', () => {
    expect(
      controller.add({
        name: 'some drama',
        language: DramaLanguage.Hindi,
        description: {}
      }),
    ).toBe(drama);
  });

  it('should call service to save drama', () => {
    expect(mockAddDramaFunction).toBeCalledTimes(1);
  });

  it('should return drama list', async () => {
    expect(await controller.findAll()).toBe(dramaList);
  });

  it('should call service to get dramas', () => {
    expect(mockGetDramasFunction).toBeCalledTimes(1);
  });
});
