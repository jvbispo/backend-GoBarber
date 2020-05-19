import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUserRepository {
  private usersRepository: User[] = [];

  public async findOne(id: string): Promise<User | undefined> {
    const user = this.usersRepository.find(item => item.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.usersRepository.find(item => item.email === email);

    return user;
  }

  public async findAllProviders(except_user_id?: string): Promise<User[]> {
    let { usersRepository } = this;

    if (except_user_id) {
      usersRepository = this.usersRepository.filter(
        user => user.id !== except_user_id,
      );
    }
    return usersRepository;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });
    this.usersRepository.push(user);
    return user;
  }

  public async save(user: User): Promise<void> {
    const userIdex = this.usersRepository.findIndex(
      findUser => findUser.id === user.id,
    );

    this.usersRepository[userIdex] = user;
  }
}

export default FakeUsersRepository;
