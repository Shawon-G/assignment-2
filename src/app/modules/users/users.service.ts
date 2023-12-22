import { User } from './users.interface';
import UsersModel from './users.model';

const createUserIntoDB = async (userData: User) => {
  const result = await UsersModel.create(userData);

  return result;
};

const getAllUsers = async () => {
  const result = await UsersModel.find().select(
    'username fullName age email address',
  );
  return result;
};

export const usersServices = {
  createUserIntoDB,
  getAllUsers,
};
