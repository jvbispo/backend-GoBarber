import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUserRepository);
  });
  it('should be able to list providers', async () => {
    const user1 = await fakeUserRepository.create({
      email: 'joao@oi.com',
      name: 'joao',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      email: 'john@oi.com',
      name: 'jo',
      password: '123456',
    });

    const user3 = await fakeUserRepository.create({
      email: 'johny@oi.com',
      name: 'johny',
      password: '123456',
    });

    const providers = await listProvidersService.execute(user1.id);

    expect(providers).toEqual([user2, user3]);
  });
});
