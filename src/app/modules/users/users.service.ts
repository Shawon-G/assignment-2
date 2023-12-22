import { User } from './users.interface';
import UsersModel from './users.model';

const createUserIntoDB = async (userData: User) => {
  const result = await UsersModel.create(userData);

  return result;
};

export const usersServices = {
  createUserIntoDB,
};
