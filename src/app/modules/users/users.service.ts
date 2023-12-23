import { User } from './users.interface';
import UsersModel from './users.model';

//  Creating users or sending data of users to DB:
const createUserIntoDB = async (userData: User) => {
  const result = await UsersModel.create(userData);

  return result;
};

//  Fetching all data of users from DB:
const getAllUsers = async () => {
  const result = await UsersModel.find().select(
    'username fullName age email address',
  );
  return result;
};

// Fetching a single user data from DB:
const getASingleUser = async (id: number) => {
  const result = await UsersModel.findOne({ userId: id }).select('-password');
  return result;
};

export const usersServices = {
  createUserIntoDB,
  getAllUsers,
  getASingleUser,
};
