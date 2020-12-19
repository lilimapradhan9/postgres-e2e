import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DramasService} from "./dramasService";
import {Drama, DramaLanguage} from "./entity/drama.entity";

describe('Dramas Service', () => {
  let service: DramasService;
  let repositoryMock;

  const drama = new Drama('Some drama', DramaLanguage.Hindi, '');

  const mockFindAll = jest.fn().mockResolvedValue([]);
  const repositoryMockFactory = jest.fn(() => ({
    save: jest.fn().mockResolvedValue(drama),
    find: jest.fn().mockResolvedValue([drama]),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DramasService,
        {
          provide: getRepositoryToken(Drama),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<DramasService>(DramasService);
    repositoryMock = module.get(getRepositoryToken(Drama));
  });

  afterEach(() => {
    repositoryMock.save.mockClear();
    mockFindAll.mockClear();
  });

  it('should give saved drama', done => {
    service.add({
      name: 'Some drama',
      language: DramaLanguage.Hindi,
      description: ''
    }).subscribe(result => {
      expect(result).toEqual(drama);
      done();
    });
  });

  it('should save drama object', done => {
    service.add(drama).subscribe(() => {
      expect(repositoryMock.save).toHaveBeenLastCalledWith(drama);
      done();
    });
  });

  it('should return dramas for given parameters', done => {
    service.findAll().subscribe(result => {
      expect(result).toEqual([drama]);
      done();
    });
  });

  it('should query repository to get all dramas', () => {
    service.findAll();

    expect(repositoryMock.find).toHaveBeenCalled();
  });
});
