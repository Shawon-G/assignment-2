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

// Deleting a single user from DB:
const deleteASingleUser = async (id: number) => {
  const result = await UsersModel.findOneAndDelete({ userId: id });
  return result;
};

// Updating a single user:
const updateASingleUser = async (id: number, updatedInformation: User) => {
  const result = await UsersModel.findOneAndUpdate(
    { userId: id },
    updatedInformation,
    {
      new: true,
    },
  ).select('-password');
  return result;
};

// Orders:-----------------
// Create Order:
const createOrder = async (id: number, orderInformation: User) => {
  const result = await UsersModel.findOne({ userId: id });

  if (result) {
    const newOrder = orderInformation.orders ?? [];
    const updatedOrder = result.orders
      ? [...result.orders, ...newOrder]
      : [orderInformation];

    const updatedResult = await UsersModel.findOneAndUpdate(
      { userId: id },
      { orders: updatedOrder },
      { new: true },
    );
    return updatedResult;
  }
  return result;
};
// Getting all orders:
const getAllOrders = async (id: number) => {
  const result = await UsersModel.findOne({ userId: id }).select('orders');
  return result;
};

// Calculating Total Price:
const getTheTotalPrice = async (id: number) => {
  const result = await UsersModel.findOne({ userId: id });

  if (result) {
    const totalPrice = result.orders?.reduce((total, order) => {
      return total + order.price * order.quantity;
    }, 0);

    return { totalPrice };
  }

  return result;
};

export const usersServices = {
  createUserIntoDB,
  getAllUsers,
  getASingleUser,
  deleteASingleUser,
  updateASingleUser,

  createOrder,
  getAllOrders,
  getTheTotalPrice,
};
